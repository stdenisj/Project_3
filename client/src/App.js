import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import RestaurantList from './components/RestaurantList'
import ShowRestaurant from './components/ShowRestaurant'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={ RestaurantList }/>
          <Route path="/restaurants/:id" component={ ShowRestaurant } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
