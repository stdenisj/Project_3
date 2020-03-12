import React, { Component } from 'react'
import axios from 'axios'
import RatingSelector from './RatingSelector'

export default class ShowRestaurant extends Component {
    
    state = {
        newReview: {
            rating: '***',
            comment: '',
            restaurant: this.props.match.params.id,
        },
        products: [],
        reviews: [],
        restaurant: {},
    };

    getReviews = () => {
        const restId = this.props.match.params.id;
        axios.get(`/api/reviews/${restId}`).then( (response) => {
            this.setState({
                reviews: response.data,
            });
        });
    };
    

    getRestaurant = () => {
        const restId = this.props.match.params.id;
        axios.get(`/api/restaurants/${ restId }`).then( (response) => {
            this.setState({
                restaurant: response.data,
            });
        });
    };
    
    addNewReview = (event) => {
        event.preventDefault();
        axios.post('/api/reviews', this.state.newReview).then( () => {
            this.getReviews();
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


    componentDidMount() {
        this.getRestaurant();
        this.getReviews();
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
