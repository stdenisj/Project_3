import React, { Component } from 'react'
import axios from 'axios'

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
        axios.post('/api/products', this.state.productForm).then( this.props.getProducts() );
    };

    submitEditedProduct = (event) => {
        event.preventDefault();
        axios.put(`/api/products/${this.props.product._id}`, this.state.productForm).then( this.props.getProducts() );
    };

    deleteProduct = (event) => {
        event.preventDefault();
        axios.delete(`/api/products/${this.props.product._id}`).then( this.props.getProducts() );
    };

    componentDidMount() {
        this.props.isEdit ? this.setState({productForm: { ...this.props.product }}) : this.setState({productForm: this.state.productForm})
    }

    render() {
        return (
            <div>
                <form onSubmit={ this.props.isEdit ? this.submitEditedProduct : this.addNewProduct } >
                    <div>
                        <div>
                            <label>Name:   </label>
                            <input 
                                type='text' 
                                name='name' 
                                onChange={ this.inputChange }
                            />
                        </div>
                        <div>
                            <label>Description:   </label>
                            <textarea 
                                name="description" 
                                rows="5" 
                                cols="25"  
                                onChange={ this.inputChange } 
                            />
                        </div>
                        <div>
                            <label>Image:   </label>
                            <input 
                                type='text' 
                                name='img' 
                                onChange={ this.inputChange }
                            />
                        </div>
                        <div>
                            <label>Price:   </label>
                            <input 
                                type='number' 
                                name='price' 
                                onChange={ this.inputChange }
                            />
                        </div>
                        <input type="submit" value="Add Product" />
                    </div>
                </form>
                { this.props.isEdit
                    ? <button onClick={ this.deleteProduct }>Delete</button>
                    : null
                }
            </div>
        )
    }
}

