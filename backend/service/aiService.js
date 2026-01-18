const summarizeText = async (text, model = "google/gemma-2-9b-it:free") => {
    try {
        const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY; // Access lazily
        console.log("DEBUG: OPENROUTER_API_KEY:", OPENROUTER_API_KEY ? "Loaded" : "Missing");
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": model,
                "messages": [
                    {
                        "role": "user",
                        "content": `Summarize the following text concisely:\n\n${text}`
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`OpenRouter API error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Summarization error:", error);
        throw error;
    }
};

const translateText = async (text, targetLanguage, model = "google/gemma-2-9b-it:free") => {
    try {
        const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY; // Access lazily
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": model,
                "messages": [
                    {
                        "role": "user",
                        "content": `Translate the following text to ${targetLanguage}. Output ONLY the translated text itself, with no additional explanation, notes, or markdown formatting:\n\n"${text}"`
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`OpenRouter API error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Translation error:", error);
        throw error;
    }
};

const explainText = async (text, model = "google/gemma-2-9b-it:free") => {
    try {
        const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY; // Access lazily
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": model,
                "messages": [
                    {
                        "role": "user",
                        "content": `Explain the following text or code snippet simply and concisely. Focus on the core logic and purpose. Avoid excessive boilerplate.\n\n"${text}"`
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`OpenRouter API error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Explanation error:", error);
        throw error;
    }
};

export default { summarizeText, translateText, explainText };
