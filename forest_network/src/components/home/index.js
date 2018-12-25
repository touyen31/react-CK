import React, {Component} from 'react';
import NavBar from '../navbar/NavBar'
import Profile from '../profile/Profile'
import {Route} from 'react-router-dom'
import './home.css'
import {Col, Grid} from "react-bootstrap";
import Follow from "../follow/Follow";
import Itemfollow from "../follow/itemfollow";
import DashboardProfileCard from "./DashboardProfileCard";

class Home extends Component {
    constructor() {
        super()
        this.state = {
            avatar: null,
            wallpaper: null,
            name: 'Name',
            username: '@Username',
        }
    }

    render() {
        return (
            <div>
                <NavBar />
                <Route path={'/info'} component={Profile}/>

                <Grid className="home-content">
                    <Col sm={6} md={3}>

                    </Col>
                    <Col sm={6} md={6}>

                    </Col>
                    <Col sm={6} md={3}>
                    </Col>
                </Grid>
            </div>
        );
    }
}

export default Home;