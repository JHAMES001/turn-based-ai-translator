// ================================================================
// MICHI — Netlify Serverless Function
// Keeps the Groq API key on the server, never exposed to the browser.
// Deployed automatically by Netlify from /netlify/functions/
// ================================================================

exports.handler = async function (event) {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { text, sourceLangName, targetLangName, historyContext } = JSON.parse(event.body);

        // Basic validation
        if (!text || !sourceLangName || !targetLangName) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing required fields' })
            };
        }

        // The key lives ONLY here, as a Netlify environment variable
        const GROQ_API_KEY = process.env.GROQ_API_KEY;

        if (!GROQ_API_KEY) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Server misconfigured: missing API key' })
            };
        }

        const contextBlock = historyContext
            ? `Previous conversation context (for reference only):\n${historyContext}\n\n`
            : '';

        const prompt = `You are a professional interpreter.

Your task: Translate the text below from ${sourceLangName} to ${targetLangName}.

Rules:
- Output ONLY the ${targetLangName} translation. Nothing else.
- Do not explain, do not add notes, do not use quotes.
- Make it sound natural and fluent in ${targetLangName}.
- Preserve the original tone and meaning.
- Do not translate into any other language.

${contextBlock}Text to translate:
${text}`;

        const response = await fetch(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    temperature: 0.1,
                    max_tokens: 512,
                    messages: [
                        {
                            role: 'system',
                            content: `You are a professional translator. You only output translated text in ${targetLangName}. You never respond in any other language. You never add explanations.`
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ]
                })
            }
        );

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            return {
                statusCode: response.status,
                body: JSON.stringify({
                    error: `Groq API error: ${errData?.error?.message || response.statusText}`
                })
            };
        }

        const data = await response.json();
        const translation = data?.choices?.[0]?.message?.content?.trim();

        if (!translation) {
            return {
                statusCode: 502,
                body: JSON.stringify({ error: 'Empty response from Groq' })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ translation })
        };

    } catch (err) {
        console.error('[translate.js] Error:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};