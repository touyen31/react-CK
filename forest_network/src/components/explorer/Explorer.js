import React, {Component} from 'react'
import {Col, Grid} from "react-bootstrap";
import './Explorer.css'
import DashboardProfileCard from "../dashboardprofilecard/DashboardProfileCard";
import NewsFeed from "../newsfeed/NewsFeed";

class Explorer extends Component {
    render() {
        return (
            <Grid className="home-content">
                <Col sm={6} md={3}>
                    <DashboardProfileCard/>
                </Col>
                <Col sm={6} md={6}>
                    <NewsFeed/>
                </Col>
                <Col sm={6} md={3}>
                </Col>
            </Grid>
        )
    }
}

export default Explorer;