import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import RestaurantList from './components/RestaurantList'
import ShowRestaurant from './components/ShowRestaurant'
import Navigation from './components/Navigation'
import LoginForm from './components/LoginForm'
import SearchPage from './components/SearchPage'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

 class App extends Component {
  state = {
    currentUser: {},
    foundRestaurants: [],
  };

  findAllRestaurants = () => {
    axios.get('/api/restaurants/').then( (response) => {
        this.setState({foundRestaurants: response.data})
    });
  }

  setUser = (user) => {
    this.setState({
      currentUser: user,
    });
  };

  logOutUser = () => {
    this.setState({ currentUser: {} })
  };

  listOfFoundRestaurants = (restaurants) => {
    this.setState({ foundRestaurants: restaurants});
  };

  componentDidMount() {
    this.findAllRestaurants();
  };


  render() {
    const loginComponent = () => (<LoginForm setUser={this.setUser}/>)
    const RestaurantListComponent = () => (<RestaurantList 
                                              user={this.state.currentUser} 
                                              restaurants={this.state.foundRestaurants}
                                            />)
    const NavigationComponent = () => (<Navigation user={this.state.currentUser} logOutUser={this.logOutUser}/>)
    const SearchPageComponent = () => (<SearchPage user={this.state.currentUser} 
                                                   listOfFoundRestaurants={ this.listOfFoundRestaurants} />)

    return (
      <div className="App" id='Application'>
        <Router>
          <Route path='/' render={ NavigationComponent } />
          <Switch>
            <Route exact path="/" render={ SearchPageComponent }/>
            <Route path="/restaurants/:id" component={ ShowRestaurant } />
            <Route path="/restaurants" render={ RestaurantListComponent }/>
            <Route path="/login" render={ loginComponent } />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App