const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    monthlyBudget: { type: Number, default: 0 },
    currentMonth: { type: String, default: new Date().toISOString().slice(0, 7) }
});

module.exports = mongoose.model('Budget', budgetSchema);