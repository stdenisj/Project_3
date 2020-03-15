import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import { Card, Button } from 'react-bootstrap'

export default class Product extends Component {

    editItem = () => { this.props.toggleEditProduct(this.props.product) }
    render() {
        const { name, description, price, img } = this.props.product
        return (


            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={ img } alt={ name } />
            <Card.Body>
                <Card.Title>{ name }</Card.Title>
                <Card.Text>
                    Price: ${ price }<br/>
                    { description }
                </Card.Text>
                <Button variant="primary" onClick={ this.editItem }>Edit Product</Button>
            </Card.Body>
            </Card>
                /* <div className='ProductImageCard'>
                    <img  src={ img } alt={ name } />
                </div>
                <div>
                    <h2>{ name }</h2>
                    <h4>Price: ${ price }</h4>
                    <p>{ description }</p>
                    <button onClick={ this.editItem }> Edit Product </button>
                </div> */
        )
    }
}
