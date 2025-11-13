export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { messages } = req.body;
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) return res.status(500).json({ error: 'Falta la clave API' });

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1:free',
        messages,
      }),
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || 'Sin respuesta del modelo';
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: 'Error al conectar con OpenRouter' });
  }
}
