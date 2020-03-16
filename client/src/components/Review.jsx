import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
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
                <Col className='Review'>
                    <Row>{ reviewerUserName }</Row>
                    <Row>{ comment }</Row>
                    <Row>
                        <span>{ date }</span>
                        <span>{ rating }</span>
                    </Row>
                    <Row>
                        <button onClick={ this.deleteReview }>Delete</button>
                    </Row>
                </Col>
        )
    }
}