const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
    createEvent,
    getMyEvents,
    getEventByAccessCode,
    updateEvent,
    deleteEvent,
    archiveEvent
} = require('../controllers/eventController');

const {
    uploadPhotos,
    getEventPhotos
} = require('../controllers/photoController');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Event routes
router.route('/')
    .post(protect, createEvent)
    .get(protect, getMyEvents);

router.get('/access/:code', getEventByAccessCode);

router.route('/:id')
    .put(protect, updateEvent)
    .delete(protect, deleteEvent);

router.put('/:id/archive', protect, archiveEvent);

// Photo routes for events
router.route('/:eventId/photos')
    .post(protect, upload.array('photos', 10), uploadPhotos)
    .get(getEventPhotos);

module.exports = router; 