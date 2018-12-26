import React, {Component} from 'react';
import NavBar from '../navbar/NavBar'
import Profile from '../profile/Profile'
import {Route} from 'react-router-dom'
import './home.css'
import Explorer from "../explorer/Explorer";


class Home extends Component {

    render() {
        return (
            <div>
                <NavBar />
                <Route exact path={'/'} component={Explorer}/>
                <Route path={'/info/:address'} component={Profile}/>

                {/*<Route path={'/info'} component={Profile}/>*/}

            </div>
        );
    }
}

export default Home;