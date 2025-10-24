const Exchange = require('../models/Exchange');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// @desc    Create exchange request
// @route   POST /api/exchanges
// @access  Private
const createExchange = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const exchange = await Exchange.create({
      ...req.body,
      requester: req.user._id
    });

    const populatedExchange = await Exchange.findById(exchange._id)
      .populate('requester', 'name email avatar')
      .populate('provider', 'name email avatar')
      .populate('skill', 'title category');

    res.status(201).json(populatedExchange);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's exchanges (sent and received)
// @route   GET /api/exchanges
// @access  Private
const getMyExchanges = async (req, res) => {
  try {
    const exchanges = await Exchange.find({
      $or: [
        { requester: req.user._id },
        { provider: req.user._id }
      ]
    })
      .populate('requester', 'name email avatar')
      .populate('provider', 'name email avatar')
      .populate('skill', 'title category')
      .sort({ createdAt: -1 });

    res.json(exchanges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update exchange status
// @route   PUT /api/exchanges/:id
// @access  Private
const updateExchange = async (req, res) => {
  try {
    const exchange = await Exchange.findById(req.params.id);

    if (!exchange) {
      return res.status(404).json({ message: 'Exchange not found' });
    }

    if (exchange.provider.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedExchange = await Exchange.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate('requester', 'name email avatar')
      .populate('provider', 'name email avatar')
      .populate('skill', 'title category');

    // Update user's total exchanges if status is completed
    if (req.body.status === 'Completed') {
      await User.findByIdAndUpdate(exchange.requester, {
        $inc: { totalExchanges: 1 }
      });
      await User.findByIdAndUpdate(exchange.provider, {
        $inc: { totalExchanges: 1 }
      });
    }

    res.json(updatedExchange);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createExchange,
  getMyExchanges,
  updateExchange
};
