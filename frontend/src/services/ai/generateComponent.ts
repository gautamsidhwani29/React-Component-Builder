import { SYSTEM_PROMPT } from "./systemPrompt"
import { GoogleGenAI } from '@google/genai';


const extractText = (response: any): string => {
    if (!response?.candidates || response.candidates.length === 0) {
        throw new Error("No candidates returned from Gemini");
    }

    for (const candidate of response.candidates) {
        const parts = candidate?.content?.parts;
        if (!parts) continue;

        for (const part of parts) {
            if (typeof part.text === "string" && part.text.trim().length > 0) {
                return part.text;
            }
        }
    }

    throw new Error("No valid text found in Gemini response");
};

const cleanJSON = (text: string): string => {
    return text.replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
}
const generateComponent = async (prompt: string) => {
    const final_prompt = `
${SYSTEM_PROMPT}

USER REQUEST:
${prompt}

INSTRUCTION:
Generate output strictly following the defined JSON structure. Do not include any extra text before or after.`

    // console.log("Generating component.....")
    const GEMINI_API_KEY = localStorage.getItem("gemini_api_key");
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY || "" });
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: final_prompt,
    });
    const text = extractText(response)
    const cleaned = cleanJSON(text);
    const parsed = JSON.parse(cleaned);
    return { parsed, cleaned };

}


export default generateComponent;