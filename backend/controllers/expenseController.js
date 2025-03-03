const Expense = require('../models/Expense');
const Budget = require('../models/Budget');
const sendEmail = require('../utils/email');

const addExpense = async (req, res) => {
    try {
        const { title, amount, category, date } = req.body;
        const userId = req.user.id;
        const expenseDate = date ? new Date(date) : new Date();
        const currentMonth = expenseDate.toISOString().slice(0, 7);

        const expense = new Expense({
            userId,
            title,
            amount,
            category,
            date: expenseDate
        });

        await expense.save();

        const budget = await Budget.findOne({ userId, currentMonth });
        if (budget) {
            const expenses = await Expense.find({
                userId,
                date: { $gte: new Date(`${currentMonth}-01`) }
            });
            const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);

            if (totalSpent >= budget.monthlyBudget * 0.8) {
                await sendEmail(req.user.email, 'Budget Alert', 'You have spent 80% or more of your monthly budget!');
            }
            if (totalSpent >= budget.monthlyBudget) {
                await sendEmail(req.user.email, 'Budget Exceeded', 'You have exceeded your monthly budget!');
            }
        }

        res.status(201).json({ message: 'Expense added successfully', expense });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { addExpense };