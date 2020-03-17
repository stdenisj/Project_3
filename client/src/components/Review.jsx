import React, { Component } from 'react'
import { Card, Image, Button} from 'react-bootstrap'
import axios from 'axios'


export default class Review extends Component {

    deleteReview = () => {
        axios.delete(`/api/reviews/${this.props.review._id}`).then( () => {
            this.props.getReviews();
        });
    };

    render() {
        const { date, comment, rating, reviewerPic, reviewerUserName} = this.props.review

        return (
                <Card className='ReviewCard'>
                    <Card.Header>
                            <Image 
                                alt="Hello User"
                                src={ reviewerPic }
                                width="50"
                                height="50"
                            />
                            <Card.Title >{ reviewerUserName }</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            { comment }<br/>
                            Rating: { rating }
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">
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