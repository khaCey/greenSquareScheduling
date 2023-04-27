import * as React from 'react';
import { useState } from 'react';
import './style.css';
import Login from './Pages/Login';
import Clock from './Pages/Clock';

export default function App() {
  const [activePage, setActivePage] = useState('Login');
  return (
    <div>
      <Login />
    </div>
  );
}
