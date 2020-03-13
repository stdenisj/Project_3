import React, { Component } from 'react'
import axios from 'axios'
// import RatingSelector from './RatingSelector'
import RestaurantForm from './RestaurantForm';
import Review from './Review'
import ReviewForm from './ReviewForm'
import ProductForm from './ProductForm'

export default class ShowRestaurant extends Component {
    
    state = {
        addProduct: false,
        addReview: false,
        isEdit: false,
        // newReview: {
        //     rating: '***',
        //     comment: '',
        //     restaurant: this.props.match.params.id,
        // },
        products: [],
        reviews: [],
        restaurant: {},
    };

    getProducts = () => {
        const restId = this.props.match.params.id;
        axios.get(`/api/products/${restId}`).then( (response) => {
            this.setState({
                products: response.data,
            });
        });
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
    
    // addNewReview = (event) => {
    //     event.preventDefault();
    //     axios.post('/api/reviews', this.state.newReview).then( () => {
    //         this.getReviews();
    //     });

    // }

    // inputChange = (event) => {
    //     const changedInput = event.target.name;
    //     const updatedNewReview = { ...this.state.newReview };
    //     updatedNewReview[changedInput] = event.target.value;
    //     this.setState({
    //         newReview: updatedNewReview,
    //     });
    // };


    componentDidMount() {
        this.getRestaurant();
        this.getReviews();
        this.getProducts()
    };

    toggleEditForm = (event) => {
        const flagStatus = !this.state.isEdit;
        this.setState({
            isEdit: flagStatus,
        });
    };

    toggleReviewForm = (event) => {
        const flagStatus = !this.state.addReview;
        this.setState({
            addReview: flagStatus,
        });
    };

    toggleProductForm = () => {
        const flagStatus = !this.state.addProduct;
        this.setState({
            addProduct: flagStatus,
        });
    };


    render() {
        return (
            <div>
                <div>
                    { this.state.reviews.map( (review, i) => {
                        return <Review review={ review } key={ i } />
                        })
                    }
                </div>
                <button onClick={ this.toggleReviewForm }>
                        { this.state.addReview
                            ? 'Cancel'
                            : 'Add Review'
                        }
                </button>
                    { this.state.addReview
                    ? <ReviewForm 
                        restaurant={ this.props.match.params.id }
                        getReviews={ this.getReviews }
                    />
                    : null
                    }
                
                
                <button onClick={ this.toggleProductForm }>
                        { this.state.addProduct
                            ? 'Cancel'
                            : 'Add Product'
                        }
                </button>
                    { this.state.addProduct
                    ? <ProductForm 
                        restaurant={ this.props.match.params.id }
                        getProducts={ this.getProducts }
                    />
                    : null
                    }

                {/* <form onSubmit={ this.addNewReview }>
                        <div>
                            <label>Description:   </label>
                            <textarea name="comment" rows="10" cols="30"  onChange={ this.inputChange }>
                            </textarea>
                        </div>
                        <RatingSelector inputChange={ this.inputChange }/>
                        <div>
                            <input type="submit" value="Add review" />
                        </div>
                </form> */}

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
