const express = require('express');
const router = express.Router();
const {
  getAllSkills,
  getMySkills,
  createSkill,
  updateSkill,
  deleteSkill
} = require('../controllers/skillController');
const { protect } = require('../middleware/authMiddleware');
const { validateSkill } = require('../middleware/validationMiddleware');

router.get('/', getAllSkills);
router.get('/my-skills', protect, getMySkills);
router.post('/', protect, validateSkill, createSkill);
router.put('/:id', protect, validateSkill, updateSkill);
router.delete('/:id', protect, deleteSkill);

module.exports = router;
