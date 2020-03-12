import React, { Component } from 'react'
import RatingSelector from './RatingSelector'
import axios from 'axios'

export default class ReviewForm extends Component {
    state = {
        newReview: {
            rating: '***',
            comment: '',
            restaurant: this.props.restaurant,
        },
    }

    addNewReview = (event) => {
        event.preventDefault();
        axios.post('/api/reviews', this.state.newReview).then( () => {
            this.props.getReviews();
        });

    }

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
            <div>
                <form onSubmit={ this.addNewReview }>
                    <div>
                        <label>Description:   </label>
                        <textarea name="comment" rows="10" cols="30"  onChange={ this.inputChange }>
                        </textarea>
                    </div>
                    <RatingSelector inputChange={ this.inputChange }/>
                    <div>
                        <input type="submit" value="Add review" />
                    </div>
                </form>

            </div>
        )
    }
}
