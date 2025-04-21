import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Neighbourhood from './components/Neighbourhood';
import Analytics from './components/Analytics';

const App = () => {
  const [reports, setReports] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/neighbourhood" element={<Neighbourhood reports={reports} setReports={setReports} />} />
        <Route path="/analytics" element={<Analytics reports={reports} />} />
      </Routes>
    </Router>
  );
};

export default App;
