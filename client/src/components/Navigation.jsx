import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Link, Redirect } from 'react-router-dom'
import { Button, Nav} from 'react-bootstrap'

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
            <Navbar bg='light' id='Navigation' expand="lg">
                {   this.state.redirect
                    ? <Redirect to='/' />
                    : null
                }
                <Link to='/' >
                    <Navbar.Brand >
                        <h4 style={{ fontFamily: 'Vast Shadow' }}>Veganelp</h4>
                        <p style={{ color: 'green',
                                    fontSize: '15px', 
                                    fontFamily: 'Playfair Display',
                                    }}>Plant-Based Restaurant Reviews</p>
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    
                <Link to='/restaurants' style={{ color: 'green',
                                        fontFamily: 'Playfair Display',
                                        fontSize: '15px',
                                        margin: '0px 10px'}} >Restaurants</Link>
                <Link to='/' style={{ color: 'green',
                                        fontFamily: 'Playfair Display',
                                        fontSize: '15px',
                                        margin: '0px 10px'}} >Search</Link>
                    </Nav>
                    { this.props.user.userName !== undefined 
                    ? <Navbar.Text >
                            <Navbar.Text style={{ margin: '0px 5vw'}}>Hello { this.props.user.name }   
                            <img alt="Hello User"
                                 src={this.props.user.profileImg}
                                 width="30"
                                 height="30"
                                 />
                            </Navbar.Text>    
                        <Button variant="success" onClick={this.logOutUser} >Log Out</Button>
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
