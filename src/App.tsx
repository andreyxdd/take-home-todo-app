import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/Welcome';
import CorePage from './pages/Core';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<WelcomePage />} />
        <Route path="/core" element={<CorePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
