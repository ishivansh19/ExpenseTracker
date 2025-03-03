const Expense = require('../models/Expense');

// Get spending stats by category
const getCategoryStats = async (req, res) => {
    try {
        const stats = await Expense.aggregate([
            { $match: { user: req.user.id } },
            { $group: { _id: '$category', totalSpent: { $sum: '$amount' } } }
        ]);
        res.json(stats);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Get monthly summary
const getMonthlySummary = async (req, res) => {
    try {
        const summary = await Expense.aggregate([
            { $match: { user: req.user.id } },
            { $group: { 
                _id: { month: { $month: '$date' }, year: { $year: '$date' } },
                totalSpent: { $sum: '$amount' }
            }}
        ]);
        res.json(summary);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

module.exports = { getCategoryStats, getMonthlySummary };