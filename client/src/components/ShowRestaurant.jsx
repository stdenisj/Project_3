import React, { Component } from 'react'
import axios from 'axios'
import RatingSelector from './RatingSelector'

export default class ShowRestaurant extends Component {
    
    state = {
        restaurant: {},
        newReview: {
            
            rating: '',
            comment: '',
            restaurant: this.props.match.params.id,
        }
    };

    

    getRestaurant = () => {
        const restid = this.props.match.params.id;
        axios.get(`/api/restaurants/${ restid }`).then( (response) => {
            this.setState({
                restaurant: response.data,
            });
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

    
    addNewReview = (event) => {
        axios.post('/api/reviews/', this.state.newReview).then( () => {
            this.getRestaurant();
        });

    }

    componentDidMount() {
        this.getRestaurant();
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
