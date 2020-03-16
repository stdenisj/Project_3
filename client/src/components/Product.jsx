import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'

export default class Product extends Component {

    editItem = () => { this.props.toggleEditProduct(this.props.product) }
    render() {
        const { name, description, price, img } = this.props.product
        return (
            <Card style={{ width: '15rem' }} className="card text-center" id='ProductCard'>
                <Card.Img variant="top" src={ img } alt={ name } height='200px'/>
                <Card.Body>
                    <Card.Title>{ name }</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Price: ${ price }</Card.Subtitle>
                    <Card.Text>
                        { description }
                    </Card.Text>
                    <Button variant="primary" onClick={ this.editItem }>Edit Product</Button>
            </Card.Body>
            </Card>
        )
    }
}
