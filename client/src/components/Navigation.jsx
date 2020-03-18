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
            <Navbar bg='light' id='Navigation'>
                {   this.state.redirect
                    ? <Redirect to='/' />
                    : null
                }
                <Link to='/' >
                    <Navbar.Brand>
                        <h4>Veganelp</h4>
                        <p style={{ color: 'green', fontSize: '12px'}}>Plant-Based Restaurant Reviews</p>
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    { this.props.user.userName !== undefined 
                    ? <Navbar.Text >
                            <Navbar.Text style={{ margin: '0px 5vw'}}>Hello { this.props.user.name }   
                            <img alt="Hello User"
                                 src={this.props.user.profileImg}
                                 width="30"
                                 height="30"
                                 />
                            </Navbar.Text>    
                        <Button variant="success" onClick={this.logOutUser}>Log Out</Button>
                    </Navbar.Text>
                    : <Navbar.Text>
                        <Link to={{
                            pathname: '/login',
                            user: this.props.user}} onClick={this.perpareRedirect}
                        ><Button variant="success" >Login</Button></Link>
                    </Navbar.Text>
                    }
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
