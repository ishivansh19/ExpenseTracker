const express = require('express');
const { setBudget, getCurrentBudget, updateBudget } = require('../controllers/budgetController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/set', authMiddleware, setBudget);
router.get('/current', authMiddleware, getCurrentBudget);
router.put('/update', authMiddleware, updateBudget);

module.exports = router;