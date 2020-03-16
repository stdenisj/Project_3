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

  logOutUser = () => {
    this.setState({ currentUser: {} })
  };

  render() {
    const loginComponent = () => (<LoginForm setUser={this.setUser}/>)
    const RestaurantListComponent = () => (<RestaurantList user={this.state.currentUser} />)
    const NavigationComponent = () => (<Navigation user={this.state.currentUser} logOutUser={this.logOutUser}/>)
    return (
      <div className="App" id='Application'>
        <Router>
          <Route path='/' render={ NavigationComponent } />
          <Switch>
            <Route exact path="/" render={ RestaurantListComponent }/>
            <Route path="/restaurants/:id" component={ ShowRestaurant } />
            <Route path="/login" render={ loginComponent } />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App