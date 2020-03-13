import React, { Component } from 'react'
import { Col } from 'react-bootstrap'

export default class Review extends Component {
    render() {
        const { date, comment, rating } = this.props.review
        console.log(date)
        // const formatedDate = date.toString().toDateString()

        return (
            <Col lg={ true }>
                <div>{ comment }</div>
                <div>
                    <span>{ date }</span>
                    <span>{ rating }</span>
                </div>
            </Col>
        )
    }
}