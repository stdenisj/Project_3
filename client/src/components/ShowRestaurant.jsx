import React, { Component } from 'react'
import axios from 'axios'
import RatingSelector from './RatingSelector'
import RestaurantForm from './RestaurantForm';
import Review from './Review'

export default class ShowRestaurant extends Component {
    
    state = {
        isEdit: false,
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

    toggleEditForm = (event) => {
        const flagStatus = !this.state.isEdit;
        this.setState({
            isEdit: flagStatus,
        });
    };;

    render() {
        return (
            <div>
                <div>
                    { this.state.reviews.map( (review, i) => {
                        return <Review review={ review } key={ i } />
                        })
                    }
                </div>
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

                <button onClick={ this.toggleEditForm }>
                        { this.state.isEdit
                            ? 'Cancel'
                            : 'Edit'
                        }
                </button>
                    { this.state.isEdit
                    ? < RestaurantForm 
                        restaurant={ this.state.restaurant }
                        isEdit={ this.state.isEdit }
                        getRestaurant={ this.getRestaurant }
                    />
                    : null
                    }
            </div>
        )
    }
}
