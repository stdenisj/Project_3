import React, { Component } from 'react'
import SeachSelector from './SeachSelector'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import StateSelector from './StateSelector'
import { Form, Button, Col } from 'react-bootstrap'

export default class SearchPage extends Component {
    state = {
        searchForm: {
            selectedSearchInput: 'name',
            searchInput: 'm',
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
        axios.get(`/api/restaurants/${selectedSearchInput}/${searchInput}`).then( (response) => {
            this.setState({foundRestaurants: response.data, redirect: true})
            this.props.listOfFoundRestaurants(this.state.foundRestaurants)
        })
    }}

    render() {
        return (
            <div id="SearchPage">
            { this.state.redirect
                ? <Redirect to='/restaurants' restaurants= { this.state.foundRestaurants } />
                : null
            }
                <div className="SearchBox">
                    <h1 className='SearchHeading'>Find Exciting New</h1><br/>
                    <h1 className='SearchHeading'>Plant-Based Restaurants</h1>
                    <Form onSubmit={ this.handleSearch } >
                        <Form.Row>
                            <Col>

                            { this.state.searchForm.selectedSearchInput === 'state'
                            ?   <StateSelector inputChange={ this.inputChange } />
                            :   <Form.Group style={{textAlign: "center"}}>
                                    <Form.Control type="text" name='searchInput' onChange={ this.inputChange}placeholder="Search:" />
                                </Form.Group>
                            } 

                            </Col>
                            <Col>
                                <SeachSelector inputChange={ this.inputChange } />
                            </Col>

                        </Form.Row>
                        <Form.Group>
                            <Button variant="success" type='submit'> Search </Button>
                        </Form.Group>
                    </Form>
                    <Button variant="success" onClick={ this.findAllRestaurants }> View All Restaurants</Button>
                </div>
            </div>
        )
    }
}
