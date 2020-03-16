import React, { Component } from 'react'

export default class SeachSelector extends Component {

    selectedOption = (event) => {
        this.props.inputChange(event);
    };

    render() {
        return (
            <div>
                <select name="selectedSearchInput" onChange={ this.selectedOption } defaultValue='name'>
                    <option value="name">Name</option>
                    <option value="city">City</option>
                    <option value="state">State(Abbreviation)</option>
                    <option value="zipcode">zipcode</option>
                </select>
            </div>
        )
    }
}
