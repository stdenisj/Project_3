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
        }
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
        axios.post('/api/products', this.state.productForm).then( () => {
            this.props.getProducts();
        });
    };

    render() {
        return (
            <div>
                <form onSubmit={ this.addNewProduct }>
                    <div>
                        <div>
                            <label>Name:   </label>
                            <input type='text' name='name' onChange={ this.inputChange }/>
                        </div>
                        <div>
                            <label>Description:   </label>
                            <textarea name="description" rows="10" cols="30"  onChange={ this.inputChange } />
                        </div>
                        <div>
                            <label>Image:   </label>
                            <input type='text' name='img' onChange={ this.inputChange }/>
                        </div>
                        <div>
                            <label>Price:   </label>
                            <input type='number' name='price' onChange={ this.inputChange }/>
                        </div>
                        <input type="submit" value="Add Product" />
                    </div>
                </form>
            </div>
        )
    }
}

