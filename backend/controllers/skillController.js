const Skill = require('../models/Skill');
const { validationResult } = require('express-validator');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
const getAllSkills = async (req, res) => {
  try {
    const { category, level, search } = req.query;
    let query = { isActive: true };

    if (category) query.category = category;
    if (level) query.level = level;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const skills = await Skill.find(query)
      .populate('user', 'name email avatar rating')
      .sort({ createdAt: -1 });

    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's skills
// @route   GET /api/skills/my-skills
// @access  Private
const getMySkills = async (req, res) => {
  try {
    const skills = await Skill.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new skill
// @route   POST /api/skills
// @access  Private
const createSkill = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const skill = await Skill.create({
      ...req.body,
      user: req.user._id
    });

    const populatedSkill = await Skill.findById(skill._id)
      .populate('user', 'name email avatar rating');

    res.status(201).json(populatedSkill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private
const updateSkill = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    if (skill.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('user', 'name email avatar rating');

    res.json(updatedSkill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    if (skill.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await skill.deleteOne();
    res.json({ message: 'Skill removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllSkills,
  getMySkills,
  createSkill,
  updateSkill,
  deleteSkill
};
