const express = require('express');
const { extractTextFromImage } = require('../utils/ocr');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/scan-receipt', upload.single('receipt'), async (req, res) => {
    const extractedText = await extractTextFromImage(req.file.path);
    res.json({ text: extractedText });
});

module.exports = router;