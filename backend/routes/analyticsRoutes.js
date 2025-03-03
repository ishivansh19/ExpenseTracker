const express = require('express');
const { getCategoryStats, getMonthlySummary } = require('../controllers/analyticsController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/category-stats', authMiddleware, getCategoryStats);
router.get('/monthly-summary', authMiddleware, getMonthlySummary);

module.exports = router;