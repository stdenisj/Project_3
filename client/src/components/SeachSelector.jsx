import React, { Component } from 'react'
import { Form } from 'react-bootstrap'

export default class SeachSelector extends Component {

    selectedOption = (event) => {
        this.props.inputChange(event);
    };

    render() {
        return (
            <Form.Group>
                <Form.Control as='select' name="selectedSearchInput" onChange={ this.selectedOption } defaultValue='name'>
                    <option value="name">Name</option>
                    <option value="city">City</option>
                    <option value="state">State</option>
                    <option value="zipcode">zipcode</option>
                </Form.Control>
            </Form.Group>
        )
    }
}
