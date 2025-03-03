const express = require('express');
const { scanReceipt } = require('../controllers/ocrController');
const upload = require('../middleware/upload');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.post('/scan-receipt', authenticate, upload.single('receipt'), scanReceipt);

module.exports = router;
