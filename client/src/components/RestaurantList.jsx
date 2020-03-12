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
    
    // inputChange = (event) => {
    //     const changedInput = event.target.name;
    //     const updatedNewRestautant = { ...this.state.newRestaurant };
    //     if (changedInput === 'street' || changedInput === 'state' || changedInput === 'zipCode' ) { 
    //         updatedNewRestautant.location[changedInput] = event.target.value
    //     } else {
    //         updatedNewRestautant[changedInput] = event.target.value;
    //     }
    //     this.setState({
    //         newRestaurant: updatedNewRestautant,
    //     });
    // };
    
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
    
    
    // addNewRestaurant = (event) => {
    //     axios.post('/api/restaurants/', this.state.newRestaurant).then( () => {
    //         this.toggleAddForm();
    //         this.getRestaurants();
    //     });
    // };

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
                //<div>
                //     <form onSubmit={ this.addNewRestaurant }>
                //         <div>
                //             <label>Name of Restaurant:   </label>
                //             <input type='text' name='name' onChange={ this.inputChange }></input>
                //         </div>
                //         <div>
                //             <label>Street Name and Number:   </label>
                //             <input type='text' name='street' onChange={ this.inputChange }></input>
                //         </div>
                //         <div>
                //         <label>State:   </label>
                //             <input type='text' name='state' onChange={ this.inputChange }></input>
                //         </div>
                //         <div>
                //         <label>zipCode:   </label>
                //             <input type='number' name='zipCode' onChange={ this.inputChange }></input>
                //         </div>
                //         <div>
                //         <label>Image of Restaurant:   </label>
                //             <input type='text' name='image' onChange={ this.inputChange }></input>
                //         </div>
                //         <div>
                //         <label>Description:   </label>
                //             <textarea name="description" rows="10" cols="30"  onChange={ this.inputChange }>
                //             </textarea>
                //         </div>
                //         <div>
                //             <input type='submit' value='Add Restaurant' />
                //         </div>
                //     </form>
                // </div>
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
