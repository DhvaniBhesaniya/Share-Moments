const asyncHandler = require('express-async-handler');
const Event = require('../models/eventModel');
const Photo = require('../models/photoModel');

// @desc    Create a new event
// @route   POST /api/events
// @access  Private
const createEvent = asyncHandler(async (req, res) => {
    const { title, description, eventDate, eventType, isPublic } = req.body;

    const event = await Event.create({
        title,
        description,
        eventDate,
        eventType,
        isPublic,
        creator: req.user._id
    });

    res.status(201).json({
        success: true,
        data: event
    });
});

// @desc    Get all events for logged in user
// @route   GET /api/events
// @access  Private
const getMyEvents = asyncHandler(async (req, res) => {
    const events = await Event.find({ creator: req.user._id })
        .sort('-createdAt');

    res.json({
        success: true,
        data: events
    });
});

// @desc    Get event by access code
// @route   GET /api/events/access/:code
// @access  Public
const getEventByAccessCode = asyncHandler(async (req, res) => {
    const event = await Event.findOne({ 
        accessCode: req.params.code,
        status: 'active'
    });

    if (!event) {
        res.status(404);
        throw new Error('Event not found');
    }

    const photos = await Photo.find({ event: event._id })
        .sort('-createdAt');

    res.json({
        success: true,
        data: {
            event,
            photos
        }
    });
});

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private
const updateEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
        res.status(404);
        throw new Error('Event not found');
    }

    // Make sure user owns event
    if (event.creator.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to update this event');
    }

    const updatedEvent = await Event.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    res.json({
        success: true,
        data: updatedEvent
    });
});

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private
const deleteEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
        res.status(404);
        throw new Error('Event not found');
    }

    // Make sure user owns event
    if (event.creator.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to delete this event');
    }

    // Delete all photos associated with the event
    await Photo.deleteMany({ event: event._id });
    
    // Delete the event
    await event.deleteOne();

    res.json({
        success: true,
        message: 'Event deleted successfully'
    });
});

// @desc    Archive event
// @route   PUT /api/events/:id/archive
// @access  Private
const archiveEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
        res.status(404);
        throw new Error('Event not found');
    }

    // Make sure user owns event
    if (event.creator.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to archive this event');
    }

    event.status = 'archived';
    await event.save();

    res.json({
        success: true,
        data: event
    });
});

module.exports = {
    createEvent,
    getMyEvents,
    getEventByAccessCode,
    updateEvent,
    deleteEvent,
    archiveEvent
}; 