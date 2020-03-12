import React, { Component } from 'react'
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

    inputChange = (event) => {
        const changedInput = event.target.name;
        const updatedNewRestautant = { ...this.state.newRestaurant };
        if (changedInput === 'street' || changedInput === 'state' || changedInput === 'zipCode' ) { 
            updatedNewRestautant.location[changedInput] = event.target.value
        } else {
            updatedNewRestautant[changedInput] = event.target.value;
        }
        this.setState({
            newRestaurant: updatedNewRestautant,
        });
    };

    addNewRestaurant = (event) => {
        event.preventDefault();
        axios.post('/api/restaurants/', this.state.newRestaurant).then( () => {
            this.toggleAddForm();
            this.getRestaurants();
        });
    };




    render() {
        
        return (
            <div>
                <form onSubmit={ this.addNewRestaurant }>
                    <div>
                        <input type='text' name='name' onChange={ this.inputChange }></input>
                    </div>
                    <div>
                        <input type='text' name='street' onChange={ this.inputChange }></input>
                    </div>
                    <div>
                        <input type='text' name='state' onChange={ this.inputChange }></input>
                    </div>
                    <div>
                        <input type='number' name='zipCode' onChange={ this.inputChange }></input>
                    </div>
                    <div>
                        <input type='text' name='image' onChange={ this.inputChange }></input>
                    </div>
                    <div>
                        <textarea name="description" rows="10" cols="30"  onChange={ this.inputChange }>
                        </textarea>
                    </div>
                    <div>
                        <input type='submit' value='Add Restaurant' />
                    </div>
                </form>
            </div>
        )
    };
};
