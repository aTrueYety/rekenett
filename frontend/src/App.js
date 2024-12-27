import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Account from './pages/Account';
import Lists from './pages/Lists';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/account" element={<Account />} />
        <Route path='/lists' element={<Lists />} />

      </Routes>
    </Router>
  );
}

export default App;
