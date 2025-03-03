const Budget = require('../models/Budget');
const Expense = require('../models/Expense');
const sendEmail = require('../utils/email');

const setBudget = async (req, res) => {
    try {
        const { monthlyBudget } = req.body;
        const userId = req.user.id;

        const budget = await Budget.findOneAndUpdate(
            { userId, currentMonth: new Date().toISOString().slice(0, 7) },
            { monthlyBudget },
            { upsert: true, new: true }
        );

        res.status(200).json({ message: 'Budget set successfully', budget });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const checkBudget = async (req, res) => {
    try {
        const userId = req.user.id;
        const currentMonth = new Date().toISOString().slice(0, 7);

        const budget = await Budget.findOne({ userId, currentMonth });
        const expenses = await Expense.find({ userId, date: { $gte: new Date(`${currentMonth}-01`) } });

        const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
        const remainingBudget = budget ? budget.monthlyBudget - totalSpent : 0;

        if (budget && totalSpent >= budget.monthlyBudget * 0.8) {
            await sendEmail(req.user.email, 'Budget Alert', 'You have spent 80% or more of your monthly budget!');
        }
        if (budget && totalSpent >= budget.monthlyBudget) {
            await sendEmail(req.user.email, 'Budget Exceeded', 'You have exceeded your monthly budget!');
        }

        res.status(200).json({
            monthlyBudget: budget ? budget.monthlyBudget : 0,
            totalSpent,
            remainingBudget
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { setBudget, checkBudget };