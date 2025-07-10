// pages/demo.js - Demo-Seite zum Testen beider Komponenten
import { useState } from 'react';
import InterestsForm from '../components/InterestsForm';
import InterestsFormSimple from '../components/InterestsFormSimple';
import InterestsTest from '../InterestsTest';

export default function Demo() {
  const [activeComponent, setActiveComponent] = useState('simple');

  const components = {
    original: { name: 'Original Form', component: InterestsForm },
    simple: { name: 'Simple Form', component: InterestsFormSimple },
    test: { name: 'API Test', component: InterestsTest },
  };

  const ActiveComponent = components[activeComponent].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          🎯 Interests Demo
        </h1>
        
        {/* Component Switcher */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-2 flex gap-2">
            {Object.entries(components).map(([key, { name }]) => (
              <button
                key={key}
                onClick={() => setActiveComponent(key)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeComponent === key
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Connection Status */}
        <div className="max-w-md mx-auto mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-400">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  🔗 Backend: localhost:5000
                </p>
                <p className="text-sm text-gray-500">
                  🌐 Frontend: localhost:3000 (Proxy aktiv)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Active Component */}
        <ActiveComponent />
        
        {/* Footer Info */}
        <div className="max-w-md mx-auto mt-8 text-center text-sm text-gray-500">
          <p>✅ NestJS Backend mit CORS</p>
          <p>✅ Vite Proxy konfiguriert</p>
          <p>✅ SWR für State Management</p>
          <p>✅ Request Logging aktiv</p>
        </div>
      </div>
    </div>
  );
}
