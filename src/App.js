// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './homepg';
import Songs from './songs';
import SongPage from './songpage';
import Login from './login';
import CreateAccount from './createAcc';
import AdminPanel from './adminPanel';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homepg" element={<Home />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/songpage/:id" element={<SongPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
};

export default App;
