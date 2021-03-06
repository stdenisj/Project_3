import React, { Component } from 'react'
import { Card, Image, Button} from 'react-bootstrap'
import axios from 'axios'


export default class Review extends Component {

    deleteReview = () => {
        axios.delete(`/api/reviews/${this.props.review._id}/${this.props.currentUser._id}`).then( () => {
            this.props.getReviews();
        });
    };

    render() {
        const { date, comment, rating, reviewerPic, reviewerUserName} = this.props.review

        return (
                <Card className='ReviewCard' style={{ 
                                                        background: 'linear-gradient(-97deg, transparent, black)',
                                                        color: 'white'
                }}>
                    <Card.Header>
                            <Image 
                                alt="Hello User"
                                src={ reviewerPic }
                                width="50"
                                height="50"
                            />
                            <Card.Title >{ reviewerUserName }</Card.Title>
                    </Card.Header>
                    <Card.Body style={{   background: 'radial-gradient(ellipse at top, grey, transparent)'}}>
                        <Card.Text>
                            { comment }<br/>
                            Rating: { rating }
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer style={{ color: 'white'}}>
                        <Card.Text>{ date }</Card.Text>   
                              { this.props.currentUser !== undefined
                               ?((this.props.currentUser.userName === reviewerUserName) || (this.props.currentUser.adminStatus))
                                    ?<Button variant="danger" size="sm" onClick={ this.deleteReview }>Delete</Button>
                                    : null
                               : null
                               }
                    </Card.Footer>
                </Card>
        )
    }
}