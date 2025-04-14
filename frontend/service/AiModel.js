import { GoogleGenerativeAI } from "/node_modules/.vite/deps/@google_generative-ai.js?v=d066310c";
import __vite__cjsImport1_mimeTypes from "/node_modules/.vite/deps/mime-types.js?v=d066310c";
const extension = __vite__cjsImport1_mimeTypes["extension"];

// Access the API key from import.meta.env
const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY; // Accessing the env variable properly in client side code.
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 2,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [],
    responseMimeType: "application/json",
};


export const AIChatSession = model.startChat({
    generationConfig,
    history: []
});