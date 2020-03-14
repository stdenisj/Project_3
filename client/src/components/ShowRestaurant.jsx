import React, { Component } from 'react'
import axios from 'axios'
// import RatingSelector from './RatingSelector'
import RestaurantForm from './RestaurantForm';
import Review from './Review'
import ReviewForm from './ReviewForm'
import ProductForm from './ProductForm'
import Product from './Product'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Image } from 'react-bootstrap';


export default class ShowRestaurant extends Component {
    
    state = {
        addProduct: false,
        addReview: false,
        isEdit: false,
        products: [],
        productToEdit: {},
        restaurant: {},
        restaurantForm: false,
        reviews: [],
        ReviewToEdit: {},
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

    componentDidMount() {
        this.getRestaurant();
        this.getReviews();
        this.getProducts()
    };

    toggleRestaurantForm = (event) => {
        const flagStatus = !this.state.restaurantForm;
        this.setState({ restaurantForm: flagStatus });
        this.toggleEditForm();
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

    toggleEditProduct = (product) => {
        this.setState({
            isEdit: true,
            productToEdit: product,
            addProduct: true,
        });
    };


    render() {
        return (
            <Container fluid>
                    <Row>
                        <Link to='/'>Home</Link>
                    </Row>
                <Row>
                    <Col sm={8}>
                        <Row>
                            { this.state.products.map( (product, i) => {
                                return <Product 
                                            product={ product } 
                                            key={ i }
                                            toggleEditProduct={ this.toggleEditProduct } 
                                        />
                            })    
                            }
                        </Row>
                    </Col>

                    <Col sm={4}>
                        <Row >
                            <Image  
                                // className='ProductImage'
                                src={ this.state.restaurant.image} 
                                alt={ this.state.restaurant.name }
                                fluid
                            />
                        </Row>
                        <Row className='text-justify'>{ this.state.restaurant.name}</Row>
                        <Row>{ this.state.restaurant.description}</Row>
                        <Row>{ this.state.restaurant.website }</Row>
                    </Col>
                </Row> 

                <Container fluid>
                        { this.state.reviews.map( (review, i) => {
                            return <Review 
                                review={ review } 
                                key={ i } 
                                getReviews={ this.getReviews }
                            />
                            })    
                        }
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

                <button onClick={ this.toggleRestaurantForm }>
                        { this.state.restaurantForm
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
                        isEdit={ this.state.isEdit }
                        product={ this.state.productToEdit }
                        restaurant={ this.props.match.params.id }
                        getProducts={ this.getProducts }
                    />
                    : null
                    }

                    { this.state.restaurantForm
                    ? < RestaurantForm 
                        restaurant={ this.state.restaurant }
                        isEdit={ this.state.isEdit }
                        getRestaurant={ this.getRestaurant }
                    />
                    : null
                }
            </Container>
        )
    }
}
