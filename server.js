const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.ANTHROPIC_API_KEY;

app.post('/api/generate', async (req, res) => {
  if (!API_KEY) {
    return res.status(500).json({ error: 'Server is missing ANTHROPIC_API_KEY. Add it in your hosting dashboard under Environment Variables.' });
  }

  const { prompt } = req.body || {};
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Missing prompt.' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: 'Claude API error: ' + errText });
    }

    const data = await response.json();
    const text = (data.content || [])
      .map(block => (block.type === 'text' ? block.text : ''))
      .join('\n')
      .trim();

    res.json({ text });
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

app.listen(PORT, () => {
  console.log('Sunshine Mail poem tool running on port ' + PORT);
});
