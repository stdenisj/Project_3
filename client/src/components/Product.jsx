import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

export default class Product extends Component {
    

    editItem = () => { this.props.toggleEditProduct(this.props.product) }
    render() {
        const { name, description, price, img } = this.props.product
        
        return (
            <div className='ProductImage'>
                <img
                    style={{ height: '180px', width: '180px'}}
                    src={ img }
                    alt={ name }
                />
                { this.props.user !== undefined
                    ? this.props.user.adminStatus === true
                        ? <Button variant="warning" onClick={ this.editItem }>Edit Product</Button>
                        : null
                    : null
                }
            </div>
        )
    }
}
