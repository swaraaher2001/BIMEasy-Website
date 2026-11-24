import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import FreeTrialPage from './pages/FreeTrialPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/freetrial" element={<FreeTrialPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
