import React, { Component } from 'react'
import Restaurant from './Restaurant'
import RestaurantForm from './RestaurantForm'
import axios from 'axios'

export default class RestaurantList extends Component {
    state = {
        newRestaurant: {
            name: null,
            location: {
                street: '',
                state: '',
                zipCode: 0,
            },
            image: '',
            description: '',
        },
        restaurants: [],
        addRestaurant: false,
        
    };

    toggleAddForm = () => {
        const status = !this.state.addRestaurant;
        this.setState({
            addRestaurant: status
        });
    };
    
    getRestaurants = () => {
        axios.get('/api/restaurants/').then( (response) => {
            const foundRestaurants = response.data;
            this.setState({
                restaurants: foundRestaurants
            });
        });
    };

    componentDidMount() {
        this.getRestaurants();
    };
    
    render() {
        
        return (
            
            <div>
                { this.state.restaurants.map( (restaurant, i) => {
                    return <Restaurant restaurant={restaurant} key={i} />
                })
                }

                { this.state.addRestaurant
                    ? <RestaurantForm 
                            addNewRestaurant={ this.addNewRestaurant } 
                            inputChange={ this.inputChange }
                            getRestaurants={ this.getRestaurants }
                            toggleAddForm={ this.toggleAddForm }
                        />
                    : null
                }
                <button onClick={ this.toggleAddForm }> 
                    {   this.state.addRestaurant
                        ? 'Cancel'         
                        : 'Add Restaurant'
                    }
                </button>
            </div>
        )
    };
};
