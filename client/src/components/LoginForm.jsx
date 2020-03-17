import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
export default class LoginForm extends Component {
    state = {
        userForm: {
            userName: '',
            password: '',
            name: '',
            profileImg: ''
        },
        currentUser: {},
        isRedirect: false,
        isAddUesr: false,
    }


    inputChange = (event) => {
        const changedInput = event.target.name;
        const updatedUserForm = { ...this.state.userForm };
        updatedUserForm[changedInput] = event.target.value;
        this.setState({
            userForm: updatedUserForm,
        });
    };
    
    addNewUser = (event) => {
        event.preventDefault();
        axios.post(`/api/users/`, this.state.userForm).then( () => {
            const createdUser = { ...this.state.userForm };
            createdUser.password = '';
            this.setState({
                currentUser: createdUser,
                isRedirect: true
            });
        });
    };

    loginUser = (event) => {
        event.preventDefault();
        const { userName, password } = this.state.userForm
        axios.get(`/api/users/${userName}/${password}`).then( 
            (response) => {
                this.props.setUser(response.data);
                this.setState({ 
                    currentUser: response.data, 
                    isRedirect: true
                 });
            });
            
        };

    toggleNewUserForm = () => {
        this.setState({
            isAddUesr: !this.state.isAddUesr
        });
    };

    
    render() {
        return (
            <div id="LoginPage">
            { this.state.isRedirect
                ? <Redirect to='/' user={this.state.currentUser} />
                : null
                }
                <Form className='LoginForm' onSubmit={ this.isAddUesr
                                ? this.addNewUser 
                                : this.loginUser }>
                  <Form.Group>
                    <Form.Control type='text' name='userName' onChange={ this.inputChange} placeholder='Enter User Name'/>
                  </Form.Group>            
                  <Form.Group>
                    <Form.Control type='password' name='password' onChange={ this.inputChange} placeholder='Enter Password' />
                  </Form.Group>
                  <Button variant="success" type='submit'>
                    { this.state.isAddUesr
                        ? 'Create User'
                        : 'Log In' 
                    }
                  </Button>
                </Form>



                {/* <form onSubmit={ this.isAddUesr
                                ? this.addNewUser 
                                : this.loginUser }>
                    <div>
                        <label>UserName:   </label>
                        <input type='text' name='userName' onChange={ this.inputChange} placeholder='Enter User Name' />
                    </div>
                    <div>                        
                        <label>Password:   </label>
                        <input type='password' name='password' onChange={ this.inputChange} placeholder='Enter Password' />
                    </div>
                    {this.state.isAddUesr
                    ? <div>
                        <div>
                            <label>Name:   </label>
                            <input type='text' name='name' onChange={ this.inputChange} placeholder='Enter Your Name' />
                        </div>
                        <div>                        
                            <label>Profile Image link:   </label>
                            <input type='text' name='profileImg' onChange={ this.inputChange} placeholder='Enter Link to profile picture' />
                        </div>
                    </div>
                    : null
                    }
                        <input type='submit' value={ this.state.isAddUesr
                                                    ? 'Create User'
                                                    : 'Log In' 
                                                }
                        />
                </form> */}

                <Button  variant="success" onClick={ this.toggleNewUserForm }>
                    {this.state.isAddUesr
                    ?'Cancel'
                    :'Create Account'
                    }
                </Button>
            </div>
        )
    }
}
