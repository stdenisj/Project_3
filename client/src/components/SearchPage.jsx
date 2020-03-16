import React, { Component } from 'react'
import SeachSelector from './SeachSelector'
import { Redirect } from 'react-router-dom'
import axios from 'axios'


export default class SearchPage extends Component {
    state = {
        searchForm: {
            selectedSearchInput: 'name',
            searchInput: '',
        },
        foundRestaurants: [],
        redirect: false
    }

    inputChange = (event) => {
        const changedInput = event.target.name;
        const updatedSearchForm = { ...this.state.searchForm };
        updatedSearchForm[changedInput] = event.target.value;
        this.setState({
            searchForm: updatedSearchForm,
        });
    };

    findAllRestaurants = () => {
        axios.get('/api/restaurants/').then( (response) => {
            this.setState({foundRestaurants: response.data, redirect: true})
            this.props.listOfFoundRestaurants(this.state.foundRestaurants)
        });
    }

handleSearch = (event) => {
    event.preventDefault()
    if (this.state.searchInput === '') {
        axios.get('/api/restaurants/').then( (response) => {
            this.setState({foundRestaurants: response.data, redirect: true})
            this.props.listOfFoundRestaurants(this.state.foundRestaurants)
        });
    } else {
        const { selectedSearchInput, searchInput } = this.state.searchForm
        console.log(selectedSearchInput, searchInput)
        axios.get(`/api/restaurants/${selectedSearchInput}/${searchInput}`).then( (response) => {
            this.setState({foundRestaurants: response.data, redirect: true})
            this.props.listOfFoundRestaurants(this.state.foundRestaurants)
        })
    }}

    render() {
        return (
            <div >
            { this.state.redirect
                ? <Redirect to='/restaurants' restaurants={this.state.foundRestaurants} />
                : null
            }
                <form onSubmit={ this.handleSearch }>
                    <input type='text' name='searchInput' onChange={ this.inputChange} placeholder='' />
                        <SeachSelector inputChange={ this.inputChange } />
                    <input type='submit' value='search' />
                </form>
                <button onClick={ this.findAllRestaurants }> View All</button>
            </div>
        )
    }
}
