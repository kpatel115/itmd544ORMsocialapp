// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Users from './components/Users';
import Posts from './components/Posts';
import Comments from './components/Comments';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/comments" element={<Comments />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

