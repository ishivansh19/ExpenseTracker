const ExpenseSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true, minlength: 3 },
    amount: { 
        type: Number, 
        required: true, 
        min: [0, 'Amount must be a positive number'],
    },
    date: { type: Date, default: Date.now },
    category: { type: String, required: true, trim: true },
    receiptUrl: { type: String, match: /^https?:\/\// },
});

module.exports = mongoose.model('Expense', ExpenseSchema);