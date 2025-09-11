import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Icon } from './components/Icon/Icon';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-3">
                <Icon name="microchip" size={32} color="#2D89EF" />
                <h1 className="text-2xl font-bold text-gray-900">WhoDoggy</h1>
              </div>
              <nav className="flex space-x-4">
                <Icon name="home" size={24} color="#2D89EF" />
                <Icon name="search" size={24} color="#2D89EF" />
                <Icon name="scan" size={24} color="#F5A623" />
                <Icon name="profile" size={24} color="#2D89EF" />
                <Icon name="settings" size={24} color="#2D89EF" />
              </nav>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/scan" element={<ScanPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Simple placeholder components to test
const HomePage = () => (
  <div className="text-center py-12">
    <Icon name="home" size={64} color="#2D89EF" className="mx-auto mb-4" />
    <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to WhoDoggy</h2>
    <p className="text-lg text-gray-600">Your trusted dog microchip registry</p>
  </div>
);

const SearchPage = () => (
  <div className="text-center py-12">
    <Icon name="search" size={64} color="#2D89EF" className="mx-auto mb-4" />
    <h2 className="text-3xl font-bold text-gray-900 mb-4">Search Dogs</h2>
    <p className="text-lg text-gray-600">Find dog information by microchip ID</p>
  </div>
);

const ScanPage = () => (
  <div className="text-center py-12">
    <Icon name="scan" size={64} color="#F5A623" className="mx-auto mb-4" />
    <h2 className="text-3xl font-bold text-gray-900 mb-4">Scan Microchip</h2>
    <p className="text-lg text-gray-600">Scan a dog's microchip to access information</p>
  </div>
);

export default App;
