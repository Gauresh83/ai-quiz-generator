export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured on server." });
  }

  try {
    const { system, messages, max_tokens } = req.body;

    const groqMessages = [];
    if (system) {
      groqMessages.push({ role: "system", content: system });
    }
    if (messages && Array.isArray(messages)) {
      messages.forEach(m => groqMessages.push({ role: m.role, content: m.content }));
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: groqMessages,
        max_tokens: max_tokens || 4000,
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || "Groq API error" });
    }

    const converted = {
      content: [
        {
          type: "text",
          text: data.choices?.[0]?.message?.content || ""
        }
      ]
    };

    return res.status(200).json(converted);

  } catch (err) {
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
}
