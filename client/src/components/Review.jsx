import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'

export default class Review extends Component {
    render() {
        const { date, comment, rating } = this.props.review
        console.log(date)
        // const formatedDate = date.toString().toDateString()

        return (
            <Row>
                <Col>
                    <Row>{ comment }</Row>
                    <Row>
                        <span>{ date }</span>
                        <span>{ rating }</span>
                    </Row>
                </Col>
            </Row>
        )
    }
}