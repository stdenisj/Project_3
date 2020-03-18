import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

export default class Restaurant extends Component {
    render() {
        const { name, location:{ street, city, state, zipCode },  image } = this.props.restaurant
        return (
            <div>
                <Card style={{ width: '15rem' }}className='RestaurantCard'>
                <Link to={{
                        pathname: `/restaurants/${this.props.restaurant._id}`,
                        restaurant: this.props.restaurant,
                        user: this.props.user 
                    }}>
                    <Card.Img 
                            src={ image } 
                            alt={ name } />
                </Link>
                <Card.Body>
                <Link to={{
                        pathname: `/restaurants/${this.props.restaurant._id}`,
                        restaurant: this.props.restaurant,
                        user: this.props.user }}
                        style={{ color: 'green'}}>
                    <Card.Title>{ name }</Card.Title>        
                </Link>
                <Card.Text>
                    { street }<br/>
                    { city }  { state }  { zipCode }
                </Card.Text>
                </Card.Body>
                </Card>
            </div>
        )
    }
}
