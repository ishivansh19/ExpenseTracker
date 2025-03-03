const Reminder = require('../models/Reminder');

// Set a reminder
const setReminder = async (req, res) => {
    try {
        const reminder = new Reminder({ ...req.body, user: req.user.id });
        await reminder.save();
        res.json(reminder);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Get all reminders
const getReminders = async (req, res) => {
    try {
        const reminders = await Reminder.find({ user: req.user.id });
        res.json(reminders);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Delete a reminder
const deleteReminder = async (req, res) => {
    try {
        await Reminder.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Reminder deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

module.exports = { setReminder, getReminders, deleteReminder };