import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'

export default class Navigation extends Component {
    state = {
        user: {},
        loggedIn: false
    }


    setUserStatus = () => this.props.user.userName === undefined
        ? null
        : this.setState({
            user: this.props.user,
            loggedIn: true,
        });

    componentWillMount() {
        this.setUserStatus();
    }
    render() {
        return (
            <Navbar>
                <Link to='/' ><Navbar.Brand>Home</Navbar.Brand></Link>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    { this.state.loggedIn        
                    ? <Navbar.Text>
                        <Link to='/login'>Hello {this.state.user.userName}</Link>
                    </Navbar.Text>
                    : <Navbar.Text>
                        <Link to='/login'>Login</Link>
                    </Navbar.Text>
                    }
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
