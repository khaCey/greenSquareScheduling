import React, { useState } from 'react';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [debugMode, setDebugMode] = useState(false);

  const handleLogin = (employeeNumber, password, debug) => {
    if (debug) {
      setIsAuthenticated(true);
      setDebugMode(true);
    } else {
      // Authenticate user normally
      // ...
      setIsAuthenticated(true);
    }
  };
  

  const handleLogout = () => {
    setIsAuthenticated(false);
    setDebugMode(false);
  };

  return (
    <>
      {isAuthenticated ? (
        <Dashboard debugMode={debugMode} handleLogout={handleLogout} />
      ) : (
        <Login
          isAuthenticated={isAuthenticated}
          loginHandler={handleLogin}
          debugMode={debugMode}
        />
      )}
    </>
  );
};

export default App;
