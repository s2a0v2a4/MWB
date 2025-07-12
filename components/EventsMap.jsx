// components/EventsMap.jsx - Map-Komponente mit Interest-Filterung
import { useState, useEffect } from 'react';
import { useEvents } from '../hooks/useEvents';
import { useInterests } from '../hooks/useInterests';

export default function EventsMap() {
  const [filterByInterests, setFilterByInterests] = useState(true);
  const { events, activeCategories, isLoading, error, joinEvent } = useEvents(filterByInterests);
  const { data: interestsData } = useInterests();

  const handleJoinEvent = async (eventId) => {
    const result = await joinEvent(eventId);
    if (result.success) {
      console.log('✅ Event beigetreten!');
    } else {
      console.error('❌ Fehler beim Beitreten:', result.error);
    }
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
        <h2 className="text-xl font-bold text-red-800 mb-2">❌ Fehler beim Laden der Events</h2>
        <p className="text-red-600">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 p-6">
      <h1 className="text-3xl font-bold mb-6">🗺️ Event Map</h1>
      
      {/* Filter Toggle */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={filterByInterests}
            onChange={(e) => setFilterByInterests(e.target.checked)}
            className="w-5 h-5 text-blue-600"
          />
          <span className="font-medium">
            📍 Nur Events meiner Interessen anzeigen
          </span>
        </label>
        
        {/* Interests Status */}
        {interestsData && (
          <div className="mt-3 text-sm text-gray-600">
            <p>
              🎯 Deine Interessen: {interestsData.count > 0 ? interestsData.count : 'Keine'} ausgewählt
            </p>
            {filterByInterests && activeCategories.length > 0 && (
              <p>
                🏷️ Aktive Event-Kategorien: {activeCategories.join(', ')}
              </p>
            )}
            {filterByInterests && activeCategories.length === 0 && interestsData.count > 0 && (
              <p className="text-orange-600">
                ⚠️ Deine Interessen haben keine passenden Event-Kategorien
              </p>
            )}
          </div>
        )}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Lade Events...</p>
        </div>
      )}

      {/* Events Grid */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Keine Events gefunden
              </h3>
              {filterByInterests ? (
                <div className="text-gray-500">
                  <p>Keine Events für deine ausgewählten Interessen.</p>
                  <button
                    onClick={() => setFilterByInterests(false)}
                    className="mt-2 text-blue-600 hover:text-blue-800 underline"
                  >
                    Alle Events anzeigen
                  </button>
                </div>
              ) : (
                <p className="text-gray-500">Noch keine Events verfügbar.</p>
              )}
            </div>
          ) : (
            events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  {/* Event Header */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                      {event.title}
                    </h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full whitespace-nowrap ml-2">
                      {event.category}
                    </span>
                  </div>
                  
                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {event.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-4">🕐 {event.time}</span>
                      <span>👥 {event.participants} Teilnehmer</span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleJoinEvent(event.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      🎯 Teilnehmen
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 p-2">
                      📍 Auf Karte
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Summary */}
      {!isLoading && events.length > 0 && (
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-blue-800 text-center">
            📊 {events.length} Event{events.length !== 1 ? 's' : ''} {filterByInterests ? 'für deine Interessen' : 'verfügbar'}
          </p>
        </div>
      )}
    </div>
  );
}
