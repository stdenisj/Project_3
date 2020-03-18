import React, { Component } from 'react'
import axios from 'axios'
import { Button, Form } from 'react-bootstrap'

export default class ProductForm extends Component {
    state = {
        productForm: {
            name: '',
            description: '',
            img: '',
            price: 0,
            restaurant: this.props.restaurant,
        },
    }

    formType = () => {
        if( this.props.isEdit ) {
            const editedProduct = { ...this.props.product }
            this.setState({
                productForm: editedProduct,
            });
        };
    };

    inputChange = (event) => {
        const changedInput = event.target.name;
        const updatedNewProduct = { ...this.state.productForm };
        updatedNewProduct[changedInput] = event.target.value;
        this.setState({
            productForm: updatedNewProduct,
        });
    };

    addNewProduct = (event) => {
        event.preventDefault();
        axios.post('/api/products', this.state.productForm).then( () => {
            this.props.toggleProductForm();
            this.props.getProducts();
        });
    };

    submitEditedProduct = (event) => {
        event.preventDefault();
        axios.put(`/api/products/${this.props.product._id}`, this.state.productForm).then( () => {
            this.props.toggleProductForm();
            this.props.getProducts();
        });
    };

    deleteProduct = (event) => {
        event.preventDefault();
        axios.delete(`/api/products/${this.props.product._id}`).then( this.props.getProducts() );
    };

    componentDidMount() {
        this.formType();
    };

    render() {
        const { name, description, img, price } = this.state.productForm
        return (
            <div>
                <Form onSubmit={ this.props.isEdit ? this.submitEditedProduct : this.addNewProduct }>
                    <Form.Group>
                        <Form.Control 
                                    type='text' 
                                    name='name'
                                    placeholder='Enter Product Name'
                                    onChange={ this.inputChange }
                                    value={ name } />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control 
                                    as='textarea'                             
                                    name="description"
                                    placeholder='Enter Product Description' 
                                    rows="5" 
                                    cols="25"  
                                    onChange={ this.inputChange }
                                    value={ description } />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control 
                                    type='text' 
                                    name='img'
                                    placeholder='Enter Product Image URL' 
                                    onChange={ this.inputChange }
                                    value={ img } />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control 
                                    type='number' 
                                    name='price'
                                    placeholder='Enter Price' 
                                    onChange={ this.inputChange }
                                    value={ price } />
                    </Form.Group>


                    <Button variant="success" type='submit'>
                        { this.props.isEdit
                            ? 'Save Changes'  
                            : 'Add Product'
                        } 
                    </Button>
                </Form>

                { this.props.isEdit
                    ? <Button variant="danger" onClick={ this.deleteProduct }>Delete</Button>
                    : null
                }
            </div>
        )
    }
}

