import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

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

    logOutUser = () => {
        this.setState({ user: {} });
        this.props.logOutUser();
    };
    
    render() {
        return (
            <Navbar>
                <Link to='/' ><Navbar.Brand>Home</Navbar.Brand></Link>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    { this.props.user.userName !== undefined 
                    ? <Navbar.Text>
                        <Link to='/'>      
                            <img alt="Hello User"
                                 src={this.state.user.profileImg}
                                 width="30"
                                 height="30"
                            /></Link>
                        <Button onClick={this.logOutUser}>Log Out</Button>
                    </Navbar.Text>
                    : <Navbar.Text>
                        <Link to={{
                            pathname: '/login',
                            user: this.props.user}}
                        >Login</Link>
                    </Navbar.Text>
                    }
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
