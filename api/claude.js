export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch(e) {}
    }

    // First API call
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-beta': 'interleaved-thinking-2025-05-14'
      },
      body: JSON.stringify(body)
    });

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); }
    catch(e) {
      return res.status(500).json({ error: 'Invalid response', raw: text.substring(0, 200) });
    }

    if (!response.ok) {
      console.error('Anthropic error:', data);
      return res.status(response.status).json(data);
    }

    // Handle tool use - if response has tool_use blocks, continue the conversation
    if (data.stop_reason === 'tool_use' && body.tools) {
      const toolUseBlocks = data.content.filter(b => b.type === 'tool_use');
      const toolResults = [];

      for (const toolBlock of toolUseBlocks) {
        // For web_search tool - Claude handles the search internally
        // We just need to send back a tool_result to continue
        toolResults.push({
          type: 'tool_result',
          tool_use_id: toolBlock.id,
          content: 'Search completed - please provide your analysis based on the search results.'
        });
      }

      // Continue conversation with tool results
      const continueBody = {
        ...body,
        messages: [
          ...body.messages,
          { role: 'assistant', content: data.content },
          { role: 'user', content: toolResults }
        ]
      };

      const continueResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-beta': 'interleaved-thinking-2025-05-14'
        },
        body: JSON.stringify(continueBody)
      });

      const continueText = await continueResponse.text();
      let continueData;
      try { continueData = JSON.parse(continueText); }
      catch(e) { continueData = data; }

      return res.status(200).json(continueData);
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ error: error.message || 'Proxy failed' });
  }
}
