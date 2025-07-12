// pages/events-test.js - Test-Seite für die komplette Integration
import { useState } from 'react';
import InterestsFormSimple from '../components/InterestsFormSimple';
import EventsMap from '../components/EventsMap';

export default function EventsTest() {
  const [activeTab, setActiveTab] = useState('interests');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          🎯 Interests → Events Integration
        </h1>
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-2 flex gap-2">
            <button
              onClick={() => setActiveTab('interests')}
              className={`px-6 py-3 rounded-md transition-colors font-medium ${
                activeTab === 'interests'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              1️⃣ Interessen wählen
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-6 py-3 rounded-md transition-colors font-medium ${
                activeTab === 'events'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              2️⃣ Events anzeigen
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'interests' && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold mb-2">Schritt 1: Wähle deine Interessen</h2>
              <p className="text-gray-600">Deine Auswahl wird im Backend gespeichert und für die Event-Filterung verwendet.</p>
            </div>
            <InterestsFormSimple />
            <div className="text-center mt-6">
              <button
                onClick={() => setActiveTab('events')}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                ➡️ Zu den Events
              </button>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold mb-2">Schritt 2: Events anzeigen</h2>
              <p className="text-gray-600">Events werden basierend auf deinen gespeicherten Interessen gefiltert.</p>
            </div>
            <EventsMap />
            <div className="text-center mt-6">
              <button
                onClick={() => setActiveTab('interests')}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                ⬅️ Zurück zu Interessen
              </button>
            </div>
          </div>
        )}

        {/* API Info */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-400">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">🔧 API-Endpunkte</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium text-blue-600">Interests API:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• <code>GET /api/interests</code> - Ausgewählte Interessen</li>
                  <li>• <code>POST /api/interests</code> - Interessen speichern</li>
                  <li>• <code>GET /api/interests/categories</code> - Event-Kategorien</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-green-600">Events API:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• <code>GET /api/events</code> - Alle Events</li>
                  <li>• <code>GET /api/events?categories=Sport,Musik</code> - Gefiltert</li>
                  <li>• <code>POST /api/events/:id/join</code> - Event beitreten</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Interest-Category Mapping Info */}
        <div className="mt-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-400">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">🎯 Interest → Category Mapping</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-1">
                <h4 className="font-medium text-green-600">📍 Events verfügbar:</h4>
                <ul className="text-gray-600">
                  <li>• ⚽ Sport → Sport Events</li>
                  <li>• 🎵 Musik → Musik Events</li>
                  <li>• 🎨 Kunst → Kunst Events</li>
                </ul>
              </div>
              <div className="space-y-1">
                <h4 className="font-medium text-orange-600">⚠️ Noch keine Events:</h4>
                <ul className="text-gray-600">
                  <li>• 💻 Technologie</li>
                  <li>• ✈️ Reisen</li>
                  <li>• 👨‍🍳 Kochen</li>
                </ul>
              </div>
              <div className="space-y-1">
                <h4 className="font-medium text-blue-600">💡 Erweiterbar:</h4>
                <p className="text-gray-600 text-xs">
                  Das Mapping kann einfach in <code>interest-category.mapping.ts</code> erweitert werden.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
