// apps/web/src/App.tsx

import React from 'react';
import HomeScreen from './pages/Home/HomeScreen';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <HomeScreen navigation={undefined} />
    </div>
  );
}

export default App;
