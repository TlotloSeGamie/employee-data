import React, { useState } from 'react';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formType, setFormType] = useState('login'); 
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleFormSwitch = (form) => {
    setFormType(form); 
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={<Login onLogin={handleLogin} />} 
          />
          <Route 
            path="home" 
            element={<Home />} 
          />
          <Route 
            path="register" 
            element={<Register onFormSwitch={handleFormSwitch} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
