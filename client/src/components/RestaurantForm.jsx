import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

export default class RestaurantForm extends Component {
    state = {
        form: {
            name: '',
            location: {
                street: '',
                city: '',
                state: '',
                zipCode: '',
            },
            website: '',
            image: '',
            description: '',
        },
        isRedirect: false,
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
        if (changedInput === 'street' || changedInput === 'state' || changedInput === 'zipCode' || changedInput === 'city' ) { 
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
            this.props.toggleRestaurantForm()
            this.props.getRestaurant()
        });
    };

    deleteRestaurant = (event) => {
        axios.delete(`/api/restaurants/${this.props.restaurant._id}`).then( (response) => {
            this.setState({
                isRedirect: true
            })
        })
    }

    componentDidMount() {
        this.formType()
    }



    render() {
        
        const {name, location: {street, city, state, zipCode}, website, image, description} = this.state.form
            
        return (
            this.state.isRedirect
            ? <Redirect to='/' />
            : <div>
                <Form onSubmit={ this.props.isEdit? this.submitEditForm : this.submitNewRestaurant }>
                    <Form.Group>
                        <Form.Control 
                                    type='text' 
                                    name='name'
                                    placeholder='Enter Restaurant Name'
                                    onChange={ this.inputChange } 
                                    value={ name }/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control 
                                    type='text'
                                    name='street'
                                    placeholder='Enter Street Address' 
                                    onChange={ this.inputChange } 
                                    value={ street }/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control 
                                    type='text' 
                                    name='city'
                                    placeholder='Enter City' 
                                    onChange={ this.inputChange }
                                    value={ city }/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                                    type='text' 
                                    name='state'
                                    placeholder='Enter State' 
                                    onChange={ this.inputChange }
                                    value={ state }/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                                    type='text'
                                    name='zipCode' 
                                    placeholder='Enter Zip-Code'
                                    onChange={ this.inputChange }
                                    value={ zipCode }/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                                    type='text' 
                                    name='image'
                                    placeholder='Enter Restaurant Picture Link'
                                    onChange={ this.inputChange }
                                    value={ image }/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control                             
                                    type='text' 
                                    name='website'
                                    placeholder='Enter Website Link'
                                    onChange={ this.inputChange } 
                                    value={ website }/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control 
                                    as='textarea'                             
                                    name="description"
                                    placeholder='Enter Description'
                                    rows="10" 
                                    cols="30"  
                                    onChange={ this.inputChange }
                                    value={ description }/>
                    </Form.Group>
                    <Button variant="success" type='submit'>
                        { this.props.isEdit
                            ? 'Save Changes'  
                            : 'Add Restaurant'
                        } 
                    </Button>
                </Form>
                { this.props.isEdit
                    ?<div>
                        <Button variant="danger" onClick={ this.deleteRestaurant }>Delete</Button>
                    </div>
                    : null
                }
            </div>
        )
    }
}
