// pages/api/interests.js
export default async function handler(req, res) {
  const BACKEND_URL = 'http://localhost:5000';

  try {
    const response = await fetch(`${BACKEND_URL}/api/interests`, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('API Proxy Error:', error);
    res.status(500).json({ error: 'Failed to proxy request to backend' });
  }
}
