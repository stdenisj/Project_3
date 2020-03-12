import React, { Component } from 'react'

export default class AddRestaurantForm extends Component {
    selectedOption = (event) => {
        this.props.inputChange(event);
    };

    submitNewForm = (event) => {
        this.props.addNewRestaurant(event);
    };

    render() {
        return (
            <div>
                 <form onSubmit={ this.submitNewForm }>
                    <div>
                        <label>Name of Restaurant:   </label>
                        <input type='text' name='name' onChange={ this.selectedOption }></input>
                    </div>
                    <div>
                        <label>Street Name and Number:   </label>
                        <input type='text' name='street' onChange={ this.selectedOption }></input>
                    </div>
                    <div>
                    <label>State:   </label>
                        <input type='text' name='state' onChange={ this.selectedOption }></input>
                    </div>
                    <div>
                    <label>zipCode:   </label>
                        <input type='number' name='zipCode' onChange={ this.selectedOption }></input>
                    </div>
                    <div>
                    <label>Image of Restaurant:   </label>
                        <input type='text' name='image' onChange={ this.selectedOption }></input>
                    </div>
                    <div>
                    <label>Description:   </label>
                        <textarea name="description" rows="10" cols="30"  onChange={ this.selectedOption }>
                        </textarea>
                    </div>
                    <div>
                        <input type='submit' value='Add Restaurant' />
                    </div>
                </form>
            </div>
        )
    }
}
