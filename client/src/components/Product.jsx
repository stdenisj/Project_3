import React, { Component } from 'react'
import { Col } from 'react-bootstrap'

export default class Product extends Component {

    editItem = () => { this.props.toggleEditProduct(this.props.product) }
    render() {
        const { name, description, price, img } = this.props.product
        return (
            <Col lg={ true }>
                <img className='ProductImage' src={ img } alt={ name } />
                <h2>{ name }</h2>
                <h4>Price: ${ price }</h4>
                <p>{ description }</p>
                <button onClick={ this.editItem }> Edit Product </button>
            </Col>
        )
    }
}
