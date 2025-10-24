const express = require('express');
const router = express.Router();
const { getUserProfile, updateProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { validateProfile } = require('../middleware/validationMiddleware');

router.get('/:id', getUserProfile);
router.put('/profile', protect, validateProfile, updateProfile);

module.exports = router;
