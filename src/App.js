import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PropertySearch from './components/PropertySearch';
import PropertyDetails from './components/PropertyDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PropertySearch />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>
    </Router>
  );
}

export default App;