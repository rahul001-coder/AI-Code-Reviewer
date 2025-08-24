import main from '../services/ai.service.js';

export const getResponse = async(req, res) => {
    const code = req.body.code;
    if (!code) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    try {
        const response = await main(code);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};