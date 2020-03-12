import React, { Component } from 'react'

export default class RestaurantForm extends Component {
    selectedOption = (event) => {
        this.props.inputChange(event);
    };

    submitNewForm = (event) => {
        this.props.addNewRestaurant(event);
    };

    render() {
        const { name, location: {street, state, zipcode}, image, description} = this.props.restaurant
        return (
            <div>
                 <form onSubmit={ this.submitNewForm }>
                    <div>
                        <label>Name of Restaurant:   </label>
                        <input 
                            type='text' 
                            name='name' 
                            onChange={ this.selectedOption } 
                            value={ this.props.isEdit
                              ? name
                              : null  
                            }
                        />
                    </div>
                    <div>
                        <label>Street Name and Number:   </label>
                        <input 
                            type='text' 
                            name='street' 
                            onChange={ this.selectedOption } 
                            value={ this.props.isEdit
                                ? street
                                : null  
                              }
                        />
                    </div>
                    <div>
                    <label>State:   </label>
                        <input 
                            type='text' 
                            name='state' 
                            onChange={ this.selectedOption }
                            value={ this.props.isEdit
                                ? state
                                : null  
                              }
                        />
                    </div>
                    <div>
                    <label>zipCode:   </label>
                        <input 
                            type='number' 
                            name='zipCode' 
                            onChange={ this.selectedOption }
                            value={ this.props.isEdit
                                ? zipcode
                                : null  
                              }
                        />
                    </div>
                    <div>
                    <label>Image of Restaurant:   </label>
                        <input 
                            type='text' 
                            name='image' 
                            onChange={ this.selectedOption }
                            value={ this.props.isEdit
                                ? image
                                : null  
                              }
                        />
                    </div>
                    <div>
                    <label>Description:   </label>
                        <textarea 
                            name="description" 
                            rows="10" 
                            cols="30"  
                            onChange={ this.selectedOption }
                            value={ this.props.isEdit
                                ? description
                                : null  
                              }
                        />
                    </div>
                    <div>
                        <input 
                            type='submit' 
                            value={ this.props.isEdit
                                ? 'Edit Restaurant'  
                                : 'Add Restaurant'
                            } 
                        />
                    </div>
                </form>
            </div>
        )
    }
}
