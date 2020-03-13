import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'

export default class Restaurant extends Component {
    render() {
        return (
            <div>
                <div>
                    <Link to={`/restaurants/${this.props.restaurant._id}`}>
                        <Image 
                            className='MainPageImage'
                            src={ this.props.restaurant.image} 
                            alt={ this.props.restaurant.name} 
                            fluid
                        />
                    </Link>
                </div>
                <div>
                    <Link to={`/restaurants/${this.props.restaurant._id}`}>
                        <h2>{ this.props.restaurant.name}</h2>
                    </Link>
                </div>
            </div>
        )
    }
}
