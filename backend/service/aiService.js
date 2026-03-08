// ============================================================
// Circuit Breaker: Google AI Models (Free Tier)
// Cycles through all available free models. If one is rate-limited
// or fails, it automatically tries the next model in the list.
// ============================================================

const GOOGLE_AI_MODELS = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-2.5-flash-lite",
    "gemma-3-27b-it",
    "gemma-3-12b-it",
    "gemma-3-4b-it",
    "gemma-3-1b-it",
];

const BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";

const callGoogleAI = async (prompt) => {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : null;
    if (!GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is missing from .env");
    }

    const errors = [];

    for (const model of GOOGLE_AI_MODELS) {
        try {
            console.log(`[Circuit Breaker] Trying model: ${model}`);
            const response = await fetch(`${BASE_URL}/${model}:generateContent?key=${GEMINI_API_KEY}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }]
                })
            });

            if (!response.ok) {
                const errText = await response.text();
                console.warn(`[Circuit Breaker] ${model} failed (${response.status} ${response.statusText}): ${errText}`);
                errors.push(`${model}: ${response.status} ${response.statusText}`);
                continue; // Try next model
            }

            const data = await response.json();

            if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
                console.warn(`[Circuit Breaker] ${model} returned an empty/invalid response`);
                errors.push(`${model}: empty response`);
                continue; // Try next model
            }

            console.log(`[Circuit Breaker] ✔ Success with model: ${model}`);
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.warn(`[Circuit Breaker] ${model} threw an error: ${error.message}`);
            errors.push(`${model}: ${error.message}`);
            continue; // Try next model
        }
    }

    // All models failed
    throw new Error(`All Google AI models failed:\n${errors.join("\n")}`);
};

// ============================================================
// OpenRouter (commented out for now, kept for future use)
// ============================================================

// const callOpenRouter = async (prompt, model) => {
//     const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
//     console.log("DEBUG: OPENROUTER_API_KEY:", OPENROUTER_API_KEY ? "Loaded" : "Missing");
//
//     const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//         method: "POST",
//         headers: {
//             "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             "model": model,
//             "messages": [
//                 {
//                     "role": "user",
//                     "content": prompt
//                 }
//             ]
//         })
//     });
//
//     if (!response.ok) {
//         throw new Error(`OpenRouter API error: ${response.statusText}`);
//     }
//
//     const data = await response.json();
//     return data.choices[0].message.content;
// };

// ============================================================
// Public API Functions
// ============================================================

const summarizeText = async (text) => {
    const prompt = `Summarize the following text concisely:\n\n${text}`;
    try {
        return await callGoogleAI(prompt);
    } catch (error) {
        console.error("Summarization error:", error);
        throw error;
    }
};

const translateText = async (text, targetLanguage) => {
    const prompt = `Translate the following text to ${targetLanguage}. Output ONLY the translated text itself, with no additional explanation, notes, or markdown formatting:\n\n"${text}"`;
    try {
        return await callGoogleAI(prompt);
    } catch (error) {
        console.error("Translation error:", error);
        throw error;
    }
};

const explainText = async (text) => {
    const prompt = `Explain the following text or code snippet simply and concisely. Focus on the core logic and purpose. Avoid excessive boilerplate.\n\n"${text}"`;
    try {
        return await callGoogleAI(prompt);
    } catch (error) {
        console.error("Explanation error:", error);
        throw error;
    }
};

export default { summarizeText, translateText, explainText };
