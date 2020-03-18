import React, { Component } from 'react'
import { Form } from 'react-bootstrap'

export default class RatingSelector extends Component {
    selectedOption = (event) => {
        this.props.inputChange(event);
    };

    render() {
        return (
                
            <Form.Group>
                <Form.Control as='select' name="rating" onChange={ this.selectedOption } defaultValue='***'>
                    <option value="*">1 star</option>
                    <option value="**">2 stars</option>
                    <option value="***">3 stars</option>
                    <option value="****">4 stars</option>
                    <option value="*****">5 stars</option>
                </Form.Control>
            </Form.Group>
        )
    }
}
