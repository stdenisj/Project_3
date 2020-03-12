import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import RestaurantList from './components/RestaurantList'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={ RestaurantList }/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
