import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import ClockIn from './Pages/ClockIn'; // updated import

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/clockin" component={ClockIn} /> // added route for ClockIn component
      </Switch>
    </Router>
  );
};

export default App;
