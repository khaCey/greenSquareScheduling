import * as React from 'react';
import { useState } from 'react';
import './style.css';
import Login from './Pages/Login.js';
import Clock from './Pages/Login.js';

export default function App() {
  const [activePage, setActivePage] = useState("Login");
  return (
    <div>
      <Login/>
    </div>
  );
}
