import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Restaurant extends Component {
    render() {
        return (
            <div>
                <div>
                    <img src={ this.props.restaurant.image} alt={ this.props.restaurant.name}/>
                </div>
                <div>
                    <h1>{ this.props.restaurant.name}</h1>
                </div>
                <Link to={`/restaurants/${this.props.restaurant._id}`}>Home</Link>
            </div>
        )
    }
}
