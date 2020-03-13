import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'

export default class Restaurant extends Component {
    render() {
        return (
            <div>
                <div>
                    <Image 
                        className='MainPageImage'
                        src={ this.props.restaurant.image} 
                        alt={ this.props.restaurant.name} 
                        fluid
                    />
                </div>
                <div>
                    <h1>{ this.props.restaurant.name}</h1>
                </div>
                <Link to={`/restaurants/${this.props.restaurant._id}`}>Home</Link>
            </div>
        )
    }
}
