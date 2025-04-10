const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide event title'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    eventDate: {
        type: Date,
        required: [true, 'Please provide event date']
    },
    eventType: {
        type: String,
        required: [true, 'Please provide event type'],
        enum: ['wedding', 'birthday', 'party', 'other']
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    accessCode: {
        type: String,
        required: true,
        unique: true
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    coverImage: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['active', 'archived'],
        default: 'active'
    }
}, {
    timestamps: true
});

// Generate a unique access code before saving
eventSchema.pre('save', async function(next) {
    if (!this.isModified('accessCode')) {
        next();
    }
    // Generate a random 6 character string if accessCode is not provided
    if (!this.accessCode) {
        this.accessCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    }
    next();
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event; 