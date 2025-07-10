// InterestsTest.jsx - Einfache Test-Komponente
import { useState, useEffect } from 'react';

const InterestsTest = () => {
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Test GET
  const fetchInterests = async () => {
    try {
      setLoading(true);
      console.log('🔄 Fetching interests...');
      
      const response = await fetch('/api/interests');
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Received data:', data);
        setInterests(data.interests);
        setMessage(`✅ Loaded ${data.count} interests`);
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Fetch error:', error);
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Test POST
  const saveInterests = async () => {
    try {
      setLoading(true);
      const testInterests = [1, 2, 3, 4];
      console.log('💾 Saving interests:', testInterests);
      
      const response = await fetch('/api/interests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ interests: testInterests }),
      });
      
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Save response:', data);
        setMessage(`✅ ${data.message}`);
        // Nach dem Speichern neu laden
        fetchInterests();
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Save error:', error);
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchInterests();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🧪 API Test - Interests</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={fetchInterests} 
          disabled={loading}
          style={{ marginRight: '10px', padding: '10px' }}
        >
          {loading ? '⏳ Loading...' : '🔄 GET Interests'}
        </button>
        
        <button 
          onClick={saveInterests} 
          disabled={loading}
          style={{ padding: '10px' }}
        >
          {loading ? '⏳ Saving...' : '💾 POST Test Data'}
        </button>
      </div>

      {message && (
        <div style={{ 
          padding: '10px', 
          marginBottom: '20px',
          backgroundColor: message.includes('❌') ? '#ffe6e6' : '#e6ffe6',
          border: '1px solid ' + (message.includes('❌') ? '#ff9999' : '#99ff99'),
          borderRadius: '4px'
        }}>
          {message}
        </div>
      )}

      <div>
        <h3>Current Interests:</h3>
        <pre style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '10px', 
          borderRadius: '4px',
          border: '1px solid #ddd'
        }}>
          {JSON.stringify(interests, null, 2)}
        </pre>
      </div>

      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <p>🎯 Backend sollte laufen auf: http://localhost:5000</p>
        <p>🌐 Frontend läuft auf: http://localhost:3000</p>
        <p>🔗 Proxy leitet /api/* an Backend weiter</p>
      </div>
    </div>
  );
};

export default InterestsTest;
