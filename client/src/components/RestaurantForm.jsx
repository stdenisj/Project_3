import React, { Component } from 'react'
import axios from 'axios'
export default class RestaurantForm extends Component {
    state = {
        form: {
            name: '',
            location: {
                street: '',
                state: '',
                zipCode: 0,
            },
            image: '',
            description: '',
        },
    }

    formType = () => {
        if(this.props.isEdit) {
            this.setState({
                form: { ...this.props.restaurant }
            });
        };
    };

    inputChange = (event) => {
        const changedInput = event.target.name;
        const updatedForm = { ...this.state.form };
        if (changedInput === 'street' || changedInput === 'state' || changedInput === 'zipCode' ) { 
            updatedForm.location[changedInput] = event.target.value
        } else {
            updatedForm[changedInput] = event.target.value;
        }
        this.setState({
            form: updatedForm,
        });
    };

    submitNewRestaurant = (event) => {
        axios.post('/api/restaurants/', this.state.form).then( () => {
            this.props.toggleAddForm();
            this.props.getRestaurants();
        });
    };

    submitEditForm = (event) => {
    event.preventDefault();
        axios.put(`/api/restaurants/${this.props.restaurant._id} `, this.state.form).then( () => {
            this.props.getRestaurant()
        });
    };

    componentDidMount() {
        this.formType()
    }



    render() {
        
        const {name, location: {street, state, zipcode}, image, description} = this.state.form
            
        return (
            <div>
                 <form onSubmit={ this.props.isEdit? this.submitEditForm : this.submitNewRestaurant }>
                    <div>
                        <label>Name of Restaurant:   </label>
                        <input 
                            type='text' 
                            name='name' 
                            onChange={ this.inputChange } 
                            value={ name }
                        />
                    </div>
                    <div>
                        <label>Street Name and Number:   </label>
                        <input 
                            type='text' 
                            name='street' 
                            onChange={ this.inputChange } 
                            value={ street }
                        />
                    </div>
                    <div>
                    <label>State:   </label>
                        <input 
                            type='text' 
                            name='state' 
                            onChange={ this.inputChange }
                            value={ state }
                        />
                    </div>
                    <div>
                    <label>zipCode:   </label>
                        <input 
                            type='number' 
                            name='zipCode' 
                            onChange={ this.inputChange }
                            value={ zipcode }
                        />
                    </div>
                    <div>
                    <label>Image of Restaurant:   </label>
                        <input 
                            type='text' 
                            name='image' 
                            onChange={ this.inputChange }
                            value={ image }
                        />
                    </div>
                    <div>
                    <label>Description:   </label>
                        <textarea 
                            name="description" 
                            rows="10" 
                            cols="30"  
                            onChange={ this.inputChange }
                            value={ description }
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