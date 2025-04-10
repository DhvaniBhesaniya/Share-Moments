const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        trim: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    metadata: {
        size: Number,
        format: String,
        width: Number,
        height: Number
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo; 