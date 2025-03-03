const { extractTextFromImage } = require('../utils/ocr');

const scanReceipt = async (req, res) => {
    try {
        const extractedText = await extractTextFromImage(req.file.path);
        res.json({ text: extractedText });
    } catch (error) {
        res.status(500).json({ message: 'OCR processing failed', error });
    }
};

module.exports = { scanReceipt };
