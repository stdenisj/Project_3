import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class LoginForm extends Component {
    state = {
        userForm: {
            userName: '',
            password: '',
        },
        currentUser: {},
        isRedirect: false
    }


    inputChange = (event) => {
        const changedInput = event.target.name;
        const updatedUserForm = { ...this.state.userForm };
        updatedUserForm[changedInput] = event.target.value;
        this.setState({
            userForm: updatedUserForm,
        });
    };

    addUser = (event) => {
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


    render() {
        return (
            <div>
            { this.state.isRedirect
                ? <Redirect to='/' user={this.state.currentUser} />
                : null
                }
                <form onSubmit={ this.addUser}>
                    <div>
                        <label>UserName:   </label>
                        <input type='text' name='userName' onChange={ this.inputChange} placeholder='Enter User Name' />
                    </div>
                    <div>                        
                        <label>Password:   </label>
                        <input type='password' name='password' onChange={ this.inputChange} placeholder='Enter Password' />
                    </div>
                        <input type='submit' value='Log In' />
                </form>
            </div>
        )
    }
}
