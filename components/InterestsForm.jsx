// components/InterestsForm.jsx
import { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  return res.json();
};

export default function InterestsForm() {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // SWR zum Laden der aktuellen Interessen
  const { data, error, isLoading: swrLoading } = useSWR('/api/interests', fetcher, {
    revalidateOnFocus: false,
    retry: 3,
  });

  // Gespeicherte Interessen in Selected State laden
  useEffect(() => {
    if (data?.interests) {
      setSelectedInterests(data.interests);
    }
  }, [data]);

  const availableInterests = [
    { id: 1, name: 'Technologie' },
    { id: 2, name: 'Sport' },
    { id: 3, name: 'Musik' },
    { id: 4, name: 'Kunst' },
    { id: 5, name: 'Reisen' },
    { id: 6, name: 'Kochen' },
  ];

  const handleInterestToggle = (interestId) => {
    setSelectedInterests(prev => 
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      console.log('📤 Sending interests:', selectedInterests);
      
      const response = await fetch('/api/interests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ interests: selectedInterests }),
      });

      const responseData = await response.json();
      console.log('📥 Response:', responseData);

      if (response.ok) {
        // SWR Cache aktualisieren
        await mutate('/api/interests');
        setMessage({ 
          type: 'success', 
          text: responseData.message || 'Interessen erfolgreich gespeichert!' 
        });
      } else {
        throw new Error(responseData.message || `HTTP ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Save error:', error);
      setMessage({ 
        type: 'error', 
        text: `Fehler beim Speichern: ${error.message}` 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Message nach 5 Sekunden ausblenden
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
        <h2 className="text-xl font-bold text-red-800 mb-2">Verbindungsfehler</h2>
        <p className="text-red-600 mb-4">
          {error.message || 'Fehler beim Laden der Daten'}
        </p>
        <button 
          onClick={() => mutate('/api/interests')}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          🔄 Erneut versuchen
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Deine Interessen</h2>
      
      {/* Loading Indicator */}
      {swrLoading && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
          <p className="text-blue-600">⏳ Lade Interessen...</p>
        </div>
      )}
      
      {/* Success/Error Messages */}
      {message.text && (
        <div className={`mb-6 p-4 rounded border ${
          message.type === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {message.type === 'success' ? '✅' : '❌'} {message.text}
        </div>
      )}
      
      {/* Aktuelle Interessen anzeigen */}
      {data && !swrLoading && (
        <div className="mb-6 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold mb-2">Gespeicherte Interessen:</h3>
          <p>Anzahl: {data.count}</p>
          <p>IDs: {data.interests.join(', ') || 'Keine'}</p>
          {data.interests.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Namen:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {data.interests.map(id => {
                  const interest = availableInterests.find(i => i.id === id);
                  return interest ? (
                    <span key={id} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {interest.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-3 mb-6">
          {availableInterests.map((interest) => (
            <label key={interest.id} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedInterests.includes(interest.id)}
                onChange={() => handleInterestToggle(interest.id)}
                className="w-4 h-4 text-blue-600"
              />
              <span>{interest.name}</span>
            </label>
          ))}
        </div>

        <button
          type="submit"
          disabled={isLoading || swrLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>⏳ Speichere...</>
          ) : (
            <>💾 Interessen speichern ({selectedInterests.length})</>
          )}
        </button>
        
        {/* Debug Info (nur Development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-3 bg-gray-50 rounded text-xs">
            <details>
              <summary className="cursor-pointer text-gray-600">🔧 Debug Info</summary>
              <div className="mt-2 space-y-1">
                <div>Selected: [{selectedInterests.join(', ')}]</div>
                <div>SWR Loading: {swrLoading ? 'Yes' : 'No'}</div>
                <div>Submit Loading: {isLoading ? 'Yes' : 'No'}</div>
                <div>Backend Data: {JSON.stringify(data)}</div>
              </div>
            </details>
          </div>
        )}
      </form>
    </div>
  );
}
