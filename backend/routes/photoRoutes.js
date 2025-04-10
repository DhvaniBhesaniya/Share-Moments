const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
    deletePhoto,
    updatePhoto
} = require('../controllers/photoController');

router.route('/:id')
    .put(protect, updatePhoto)
    .delete(protect, deletePhoto);

module.exports = router; 