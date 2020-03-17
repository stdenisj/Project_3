import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Link, Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default class Navigation extends Component {
    state = {
        redirect: false
    }

    logOutUser = () => {
        this.setState({ redirect: true });
        this.props.logOutUser()
    };

    perpareRedirect = () => {
        this.setState({ redirect: false })
    }
    render() {
        return (
            <Navbar bg='success'>
                {   this.state.redirect
                    ? <Redirect to='/' />
                    : null
                }
                <Link to='/' ><Navbar.Brand>Home</Navbar.Brand></Link>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    { this.props.user.userName !== undefined 
                    ? <Navbar.Text>
                        <Link to='/'>      
                            <img alt="Hello User"
                                 src={this.props.user.profileImg}
                                 width="30"
                                 height="30"
                            /></Link>
                        <Button onClick={this.logOutUser}>Log Out</Button>
                    </Navbar.Text>
                    : <Navbar.Text>
                        <Link to={{
                            pathname: '/login',
                            user: this.props.user}} onClick={this.perpareRedirect}
                        >Login</Link>
                    </Navbar.Text>
                    }
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
