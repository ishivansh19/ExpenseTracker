const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    amount: Number,
    category: String,
    date: { type: Date, default: Date.now },
    receiptImage: String,
});

module.exports = mongoose.model('Expense', expenseSchema);