import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

async function main(prompt) {
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: `You are a senior software engineer acting as a professional code reviewer. 
Your job is to:
- Evaluate code for correctness, clarity, and maintainability.
- Identify bugs, bad practices, or inefficiencies.
- Suggest improvements with brief explanations.
Be concise, honest, and educational.`,
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
}

export default main;