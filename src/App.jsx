import React, { useState } from 'react';
import { NabvarCompactCollapse } from './navbar-compact-collapse';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page1 from './pages/RecommendationsPage'
import Page2 from './pages/Page2'
import Page3 from './pages/Page3'
import './App.css'
import Page4 from './pages/Page4';
const App = () => {
  
  return (
    <Router>
      <div className='container'>
        <div className='side-menu'>
          <NabvarCompactCollapse />
        </div>
        <div className='main-content'>
          <Routes>
            <Route path="/" element={<Page1 />} />
            <Route path="/page2" element={<Page2 />} />
            <Route path="/page3" element={<Page3 />} />
            <Route path="/page4" element={<Page4 />} />
          </Routes>
        </div>
        
      </div>
    </Router>
  );
};
export default App;