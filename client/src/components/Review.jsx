import React, { Component } from 'react'

export default class Review extends Component {
    render() {
        const { date, comment, rating } = this.props.review
        return (
            <div>
                <div>{ comment }</div>
                <div>
                    <span>{ date }</span>
                    <span>{ rating }</span>
                </div>
            </div>
        )
    }
}