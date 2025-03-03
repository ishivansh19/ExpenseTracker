const express = require('express');
const { setReminder, getReminders, deleteReminder } = require('../controllers/reminderController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/set', authMiddleware, setReminder);
router.get('/', authMiddleware, getReminders);
router.delete('/:id', authMiddleware, deleteReminder);

module.exports = router;