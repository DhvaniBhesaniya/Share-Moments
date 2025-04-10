const asyncHandler = require('express-async-handler');
const Photo = require('../models/photoModel');
const Event = require('../models/eventModel');
const cloudinary = require('../utils/cloudinary'); // We'll create this later

// @desc    Upload photos to an event
// @route   POST /api/events/:eventId/photos
// @access  Private
const uploadPhotos = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.eventId);

    if (!event) {
        res.status(404);
        throw new Error('Event not found');
    }

    // Check ownership
    if (event.creator.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to upload to this event');
    }

    if (!req.files || req.files.length === 0) {
        res.status(400);
        throw new Error('Please upload at least one photo');
    }

    const uploadPromises = req.files.map(async (file) => {
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(file.path, {
            folder: `events/${event._id}`,
            transformation: [
                { width: 2000, height: 2000, crop: "limit" }, // Main image
                { width: 300, height: 300, crop: "fill", gravity: "auto" } // Thumbnail
            ]
        });

        // Create photo record
        return Photo.create({
            event: event._id,
            imageUrl: result.secure_url,
            thumbnailUrl: result.eager[0].secure_url,
            uploadedBy: req.user._id,
            metadata: {
                size: result.bytes,
                format: result.format,
                width: result.width,
                height: result.height
            }
        });
    });

    const photos = await Promise.all(uploadPromises);

    res.status(201).json({
        success: true,
        data: photos
    });
});

// @desc    Get photos for an event
// @route   GET /api/events/:eventId/photos
// @access  Private/Public (depends on event settings)
const getEventPhotos = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.eventId);

    if (!event) {
        res.status(404);
        throw new Error('Event not found');
    }

    // If event is not public, check access
    if (!event.isPublic) {
        // Check if user is creator or has access code
        const hasAccess = 
            (req.user && event.creator.toString() === req.user._id.toString()) ||
            req.query.accessCode === event.accessCode;

        if (!hasAccess) {
            res.status(401);
            throw new Error('Not authorized to view these photos');
        }
    }

    const photos = await Photo.find({ event: event._id })
        .sort('-createdAt');

    res.json({
        success: true,
        data: photos
    });
});

// @desc    Delete photo
// @route   DELETE /api/photos/:id
// @access  Private
const deletePhoto = asyncHandler(async (req, res) => {
    const photo = await Photo.findById(req.params.id)
        .populate('event');

    if (!photo) {
        res.status(404);
        throw new Error('Photo not found');
    }

    // Check ownership
    if (photo.event.creator.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to delete this photo');
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(photo.imageUrl);
    
    // Delete from database
    await photo.deleteOne();

    res.json({
        success: true,
        message: 'Photo deleted successfully'
    });
});

// @desc    Update photo (caption, featured status)
// @route   PUT /api/photos/:id
// @access  Private
const updatePhoto = asyncHandler(async (req, res) => {
    const photo = await Photo.findById(req.params.id)
        .populate('event');

    if (!photo) {
        res.status(404);
        throw new Error('Photo not found');
    }

    // Check ownership
    if (photo.event.creator.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to update this photo');
    }

    const updatedPhoto = await Photo.findByIdAndUpdate(
        req.params.id,
        { 
            caption: req.body.caption,
            featured: req.body.featured
        },
        { new: true }
    );

    res.json({
        success: true,
        data: updatedPhoto
    });
});

module.exports = {
    uploadPhotos,
    getEventPhotos,
    deletePhoto,
    updatePhoto
}; 