// FollowOp — Claude API Proxy
// Serverless function for Vercel
// Proxies requests to Anthropic Claude API for:
//   - Contact intelligence (Read The Room, Research)
//   - Business card scanning (vision)
//   - Report generation (clients/referrals reports)
//   - Room assessment (Vibe The Room)
//   - Communication analysis

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: { message: 'Method not allowed' } });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: { message: 'API key not configured' } });
  }

  try {
    const body = req.body;

    // Validate required fields
    if (!body.model || !body.messages) {
      return res.status(400).json({ error: { message: 'Missing required fields: model, messages' } });
    }

    // Build Anthropic API request
    const anthropicBody = {
      model: body.model,
      max_tokens: body.max_tokens || 1024,
      messages: body.messages
    };

    // Include tools if provided (e.g., web_search for Research feature)
    if (body.tools) {
      anthropicBody.tools = body.tools;
    }

    // Include system prompt if provided
    if (body.system) {
      anthropicBody.system = body.system;
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(anthropicBody)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[FollowOp API] Anthropic error:', JSON.stringify(data).substring(0, 500));
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('[FollowOp API] Server error:', error.message);
    return res.status(500).json({
      error: { message: 'Internal server error: ' + error.message }
    });
  }
}
