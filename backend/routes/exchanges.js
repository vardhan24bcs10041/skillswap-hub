const express = require('express');
const router = express.Router();
const {
  createExchange,
  getMyExchanges,
  updateExchange
} = require('../controllers/exchangeController');
const { protect } = require('../middleware/authMiddleware');
const { validateExchange } = require('../middleware/validationMiddleware');

router.post('/', protect, validateExchange, createExchange);
router.get('/', protect, getMyExchanges);
router.put('/:id', protect, updateExchange);

module.exports = router;
