import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'

export default class Navigation extends Component {
    render() {
        return (
            <Navbar>
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <a href="#login">Login</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
