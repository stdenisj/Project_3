import React, { Component } from 'react'
import RatingSelector from './RatingSelector'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'

export default class ReviewForm extends Component {
    state = {
        newReview: {
            user: this.props.user.id,
            reviewerUserName: this.props.user.userName,
            reviewerPic: this.props.user.profileImg,
            rating: '***',
            comment: '',
            restaurant: this.props.restaurant,
        },
    }

    addNewReview = (event) => {
        event.preventDefault();
        let submitted = { ...this.state.newReview };
        let dateSubmitted = new Date();
        submitted.date = dateSubmitted.toDateString();
        axios.post('/api/reviews', submitted).then( () => {
            this.props.toggleReviewForm();
            this.props.getReviews();
        });
    };

    inputChange = (event) => {
        const changedInput = event.target.name;
        const updatedNewReview = { ...this.state.newReview };
        updatedNewReview[changedInput] = event.target.value;
        this.setState({
            newReview: updatedNewReview,
        });
    };

    render() {
        return (
                <Form onSubmit={ this.addNewReview }>

                <Form.Group>
                    <Form.Control as='textarea' name="comment" rows="5" cols="30"  onChange={ this.inputChange } placeholder="Review"/>
                </Form.Group>
                    <RatingSelector inputChange={ this.inputChange }/>
                <Button variant="success" type="submit">
                    Submit Review
                </Button>
            </Form>
        )
    }
}