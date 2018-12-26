import React, {Component} from 'react';
import NavBar from '../navbar/NavBar'
import Profile from '../profile/Profile'
import {Route} from 'react-router-dom'
import './home.css'
import {Col, Grid} from "react-bootstrap";
import DashboardProfileCard from "./DashboardProfileCard";

class Home extends Component {

    render() {
        return (
            <div>
                <NavBar />
                <Route path={'/info/:address'} component={Profile}/>

                {/*<Route path={'/info'} component={Profile}/>*/}

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