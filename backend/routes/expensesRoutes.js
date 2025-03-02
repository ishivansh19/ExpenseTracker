const express = require('express');
const Expense = require('../models/Expense');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add',authenticate ,async (req, res) => {
    const { title, amount, category, date, receiptImage, userId } = req.body;
    const expense = new Expense({ title, amount, category, date, receiptImage, userId });
    await expense.save();
    res.send('Expense added successfully');
});

router.get('/:userId', authenticate,async (req, res) => {
    const expenses = await Expense.find({ userId: req.params.userId });
    res.json(expenses);
});

module.exports = router;