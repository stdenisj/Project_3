import React, { Component } from 'react'
import Restaurant from './Restaurant'
import RestaurantForm from './RestaurantForm'
import { Container, CardColumns } from 'react-bootstrap'

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
        restaurants: this.props.restaurants,
        addRestaurant: false,
        
    };

    toggleAddForm = () => {
        const status = !this.state.addRestaurant;
        this.setState({
            addRestaurant: status
        });
    };

    render() {
        
        return (
            <div id='ReataurantListPage'>
            <Container className='RestaurantListCard' >

                <CardColumns>

                { this.props.restaurants.map( (restaurant, i) => {
                    return <Restaurant restaurant={restaurant} key={i} user={ this.props.user } />
                })
            }
            
                </CardColumns>

                { this.state.addRestaurant
                    ? <RestaurantForm 
                    addNewRestaurant={ this.addNewRestaurant } 
                    inputChange={ this.inputChange }
                    getRestaurants={ this.getRestaurants }
                    toggleAddForm={ this.toggleAddForm }
                    />
                    : null
                }
                { this.props.user !== undefined
                    ? this.props.user.adminStatus === true
                        ?    <button onClick={ this.toggleAddForm }> 
                                {   this.state.addRestaurant
                                    ? 'Cancel'         
                                    : 'Add Restaurant'
                                }
                            </button>
                        :null
                        :null
                    }
            </Container>
        </div>
        )
    };
};
