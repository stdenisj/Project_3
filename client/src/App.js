import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import RestaurantList from './components/RestaurantList'
import ShowRestaurant from './components/ShowRestaurant'
import Navigation from './components/Navigation'
import LoginForm from './components/LoginForm'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

 class App extends Component {
  state = {
    currentUser: {},
  };

  setUser = (user) => {
    this.setState({
      currentUser: user,
    });
  };

  render() {
    const loginComponent = () => (<LoginForm setUser={this.setUser}/>)
   
    return (
      <div className="App">
        <Navigation />
        <Router>
          <Switch>
            <Route exact path="/" component={ RestaurantList }/>
            <Route path="/restaurants/:id" component={ ShowRestaurant } />
            <Route path="/login" render={ loginComponent } />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App