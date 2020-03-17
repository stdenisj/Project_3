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
                <Form onSubmit={ this.handleSearch } className="text-center">
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
                        <Button type='submit'> Search </Button>
                    </Form.Group>
                        
                        {/* // <input type='submit' value='search' /> */}
                </Form>
                <Button onClick={ this.findAllRestaurants }> View All Restaurants</Button>
            </div>









            // <div id="SearchPage">
            // { this.state.redirect
            //     ? <Redirect to='/restaurants' restaurants={this.state.foundRestaurants} />
            //     : null
            // }
            //     <form onSubmit={ this.handleSearch } >
            //         { this.state.searchForm.selectedSearchInput === 'state'
            //          ?<StateSelector inputChange={ this.inputChange } />
            //          :<input type='text' name='searchInput' onChange={ this.inputChange} placeholder='' />
            //         }
            //             <SeachSelector inputChange={ this.inputChange } />
            //         <input type='submit' value='search' />
            //     </form>
            //     <button onClick={ this.findAllRestaurants }> View All</button>
            // </div>
        )
    }
}
