import React, { Component } from 'react'
import { Button, Col, Image } from 'react-bootstrap'

export default class Product extends Component {
    

    editItem = () => { this.props.toggleEditProduct(this.props.product) }
    render() {
        const { name, img } = this.props.product
        
        return (
            <Col className='ProductImage'>
                <div >
                    <Image
                        style={{    height: '180px', 
                                    width: '180px',
                                    borderRadius: '15px'
                                }}
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
            </Col>
        )
    }
}
