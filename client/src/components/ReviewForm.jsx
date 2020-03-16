import React, { Component } from 'react'
import RatingSelector from './RatingSelector'
import axios from 'axios'

export default class ReviewForm extends Component {
    state = {
        newReview: {
            user: this.props.user._id,
            reviewerUserName: this.props.user.userName,
            reviewerPic: this.props.user.profileImg,
            rating: '***',
            comment: '',
            restaurant: this.props.restaurant,
        },
    }

    addNewReview = (event) => {
        event.preventDefault();
        axios.post('/api/reviews', this.state.newReview).then( () => {
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
            <div>
                <form onSubmit={ this.addNewReview }>
                    <div>
                        <div>Description:   </div>
                        <textarea name="comment" rows="5" cols="30"  onChange={ this.inputChange }>
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
