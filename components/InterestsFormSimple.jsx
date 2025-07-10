// components/InterestsFormSimple.jsx - Vereinfachte Version mit Custom Hook
import { useEffect } from 'react';
import { useInterests } from '../hooks/useInterests';

const availableInterests = [
  { id: 1, name: 'Technologie', emoji: '💻' },
  { id: 2, name: 'Sport', emoji: '⚽' },
  { id: 3, name: 'Musik', emoji: '🎵' },
  { id: 4, name: 'Kunst', emoji: '🎨' },
  { id: 5, name: 'Reisen', emoji: '✈️' },
  { id: 6, name: 'Kochen', emoji: '👨‍🍳' },
];

export default function InterestsFormSimple() {
  const {
    data,
    error,
    selectedInterests,
    message,
    isLoading,
    swrLoading,
    toggleInterest,
    saveInterests,
    clearMessage,
    refresh,
  } = useInterests();

  // Message automatisch ausblenden
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(clearMessage, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, clearMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveInterests();
  };

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
        <h2 className="text-xl font-bold text-red-800 mb-2">❌ Verbindungsfehler</h2>
        <p className="text-red-600 mb-4">{error.message}</p>
        <button 
          onClick={refresh}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          🔄 Erneut versuchen
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">✨ Deine Interessen</h2>
      
      {/* Loading */}
      {swrLoading && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded animate-pulse">
          <p className="text-blue-600">⏳ Lade Interessen...</p>
        </div>
      )}
      
      {/* Messages */}
      {message.text && (
        <div className={`mb-6 p-4 rounded border transition-all ${
          message.type === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {message.type === 'success' ? '✅' : '❌'} {message.text}
        </div>
      )}
      
      {/* Current Interests Display */}
      {data && !swrLoading && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            📊 Gespeicherte Interessen: 
            <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
              {data.count}
            </span>
          </h3>
          
          {data.interests.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {data.interests.map(id => {
                const interest = availableInterests.find(i => i.id === id);
                return interest ? (
                  <span key={id} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1">
                    <span>{interest.emoji}</span>
                    <span>{interest.name}</span>
                  </span>
                ) : null;
              })}
            </div>
          ) : (
            <p className="text-gray-500 italic">Noch keine Interessen ausgewählt</p>
          )}
        </div>
      )}

      {/* Interest Selection Form */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-3 mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Wähle deine Interessen:</h3>
          {availableInterests.map((interest) => (
            <label 
              key={interest.id} 
              className="flex items-center space-x-3 p-3 rounded-lg border-2 border-gray-200 hover:border-blue-300 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedInterests.includes(interest.id)}
                onChange={() => toggleInterest(interest.id)}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="text-2xl">{interest.emoji}</span>
              <span className="flex-1 font-medium">{interest.name}</span>
              {selectedInterests.includes(interest.id) && (
                <span className="text-blue-500 font-semibold">✓</span>
              )}
            </label>
          ))}
        </div>

        <button
          type="submit"
          disabled={isLoading || swrLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Speichere...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              💾 Interessen speichern
              {selectedInterests.length > 0 && (
                <span className="bg-white text-blue-600 px-2 py-1 rounded-full text-sm font-bold">
                  {selectedInterests.length}
                </span>
              )}
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
