import React, { Component } from 'react'
import axios from 'axios'
// import RatingSelector from './RatingSelector'
import RestaurantForm from './RestaurantForm';
import Review from './Review'
import ReviewForm from './ReviewForm'
import ProductForm from './ProductForm'
import Product from './Product'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap';


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
            <Container fluid>
                    <Row>
                        <Link to='/'>Home</Link>
                    </Row>
                <Row>
                    <Col md='auto'>
                        <Row>
                            { this.state.products.map( (product, i) => {
                                return <Product product={ product } key={ i } />
                            })    
                        }
                        </Row>
                    </Col>

                    <Col >
                        <Row><img  
                                className='ProductImage'
                                src={ this.state.restaurant.image} 
                                alt={ this.state.restaurant.name }/>
                        </Row>
                        <Row className='text-justify'>{ this.state.restaurant.name}</Row>
                        <Row>{ this.state.restaurant.description}</Row>
                    </Col>
                </Row> 

                <Container fluid>
                    <Row>
                        { this.state.reviews.map( (review, i) => {
                            return <Review review={ review } key={ i } />
                            })    
                        }
                    </Row>
                </Container>

                <button onClick={ this.toggleReviewForm }>
                        { this.state.addReview
                            ? 'Cancel'
                            : 'Add Review'
                        }
                </button>

                <button onClick={ this.toggleProductForm }>
                        { this.state.addProduct
                            ? 'Cancel'
                            : 'Add Product'
                        }
                </button>

                <button onClick={ this.toggleEditForm }>
                        { this.state.isEdit
                            ? 'Cancel'
                            : 'Edit'
                        }
                </button>

                    { this.state.addReview
                    ? <ReviewForm 
                        restaurant={ this.props.match.params.id }
                        getReviews={ this.getReviews }
                    />
                    : null
                    }
                
                
                    { this.state.addProduct
                    ? <ProductForm 
                        restaurant={ this.props.match.params.id }
                        getProducts={ this.getProducts }
                    />
                    : null
                    }

                    { this.state.isEdit
                    ? < RestaurantForm 
                    restaurant={ this.state.restaurant }
                    isEdit={ this.state.isEdit }
                    getRestaurant={ this.getRestaurant }
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
            </Container>
        )
    }
}
