import React, { Component } from 'react'
import axios from 'axios'
// import RatingSelector from './RatingSelector'
import RestaurantForm from './RestaurantForm';
import Review from './Review'
import ReviewForm from './ReviewForm'
import Product from './Product'
import ProductForm from './ProductForm'
import { Container, Row, Col, Card, CardColumns } from 'react-bootstrap';


export default class ShowRestaurant extends Component {
    
    state = {
        currentUser: this.props.location.user,
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

    toggleRestaurantForm = () => {
        const flagStatus = !this.state.restaurantForm;
        this.setState({ restaurantForm: flagStatus });
        this.toggleEditForm();
    };

    toggleEditForm = () => {
        const flagStatus = !this.state.isEdit;
        this.setState({
            isEdit: flagStatus,
        });
    };

    toggleReviewForm = () => {
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
                <Row className='ProductRow'>
                    {this.state.products.map( (product, i) => {
                        return <Product product={ product } 
                                        key={ i } 
                                        toggleEditProduct={ this.toggleEditProduct } 
                                        user={ this.state.currentUser } />
                        })
                    }       
                </Row>
                <Row>
                    <Col>
                        <Card>
                           <Card.Body>
                               <Card.Title>{ this.state.restaurant.name}</Card.Title>
                               <Card.Text>
                               { this.state.restaurant.description}<br/>
                               <a href={this.state.restaurant.website}>{ this.state.restaurant.website }</a>
                               </Card.Text> 
                           </Card.Body>
                       </Card>
                    </Col> 
                    <Col>
                        <Row className='ReviewRow'>
                            <CardColumns className='ReviewColumns'>
                            { this.state.reviews.map( (review, i) => {
                                return <Review 
                                review={ review } 
                                key={ i } 
                                getReviews={ this.getReviews }
                                currentUser={ this.state.currentUser}
                                />
                                })    
                            }
                            </CardColumns>
                        </Row>
                    </Col>
                </Row>




        { this.state.currentUser !== undefined
            ?   <button onClick={ this.toggleReviewForm }>
                    { this.state.addReview
                        ? 'Cancel'
                        : 'Add Review'
                    }
                </button>
            :   null
        }

        { this.state.currentUser !== undefined
            ? this.state.currentUser.adminStatus
                ? <div>
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


            { this.state.addProduct
                ?<ProductForm
                    isEdit={ this.state.isEdit }
                    product={ this.state.productToEdit }
                    restaurant={ this.props.match.params.id }
                    getProducts={ this.getProducts }
                    toggleProductForm={ this.toggleProductForm }
                    currentUser={ this.state.currentUser }
                />
                : null           
            }
            { this.state.restaurantForm
                ? < RestaurantForm 
                        restaurant={ this.state.restaurant }
                        isEdit={ this.state.isEdit }
                        getRestaurant={ this.getRestaurant }
                        toggleRestaurantForm={ this.toggleRestaurantForm }
                    />
                : null
            }
            </div>
        :null
    :null
        }
        { this.state.addReview
            ? <ReviewForm 
                restaurant={ this.props.match.params.id }
                getReviews={ this.getReviews }
                toggleReviewForm={ this.toggleReviewForm }
                user={ this.state.currentUser }
            />
            : null
            }
            </Container>
        )
    }
}
