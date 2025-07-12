// pages/api/events.js
export default async function handler(req, res) {
  const BACKEND_URL = 'http://localhost:5000';
  
  try {
    // URL mit Query-Parametern für Event-Filterung
    let url = `${BACKEND_URL}/api/events`;
    if (req.query.categories) {
      url += `?categories=${req.query.categories}`;
    }

    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Events API Proxy Error:', error);
    res.status(500).json({ error: 'Failed to proxy request to backend' });
  }
}
