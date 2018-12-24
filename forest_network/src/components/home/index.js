import React, {Component} from 'react';
import NavBar from '../navbar/NavBar'
import Profile from '../profile/Profile'
import {Route} from 'react-router-dom'
class Home extends Component {
    render() {
        return (
            <div>
                <NavBar/>

                <Route path={'/info'} component={Profile}/>
            </div>
        );
    }
}

export default Home;