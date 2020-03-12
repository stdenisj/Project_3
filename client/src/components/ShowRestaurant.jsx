import React, { Component } from 'react'
import axios from 'axios'

export default class ShowRestaurant extends Component {
    
    getRestaurant = () => {

        axios.get('res')
    }


    render() {
        return (
            <div>
                
            </div>
        )
    }
}
