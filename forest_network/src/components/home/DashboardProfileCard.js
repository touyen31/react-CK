import React, {Component} from 'react';
import './DashboardProfileCard.css'
import {Image} from "react-bootstrap";
import {connect} from "react-redux";


class DashboardProfileCard extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (
            <div className="DashboardProFileCard module">
                <a className="DashboardProfileCard-bg u-bgUserColor u-block" href="/" tabIndex="-1" aria-hidden="true" rel="noopener"/>
                <div className="DashboardProFileCard-content">
                    <div className="DashboardProFileCard-avatarContainer">
                        <a className="DashboardProFileCard-avatarLink u-inlineBlock" href="/" tabIndex="-1" aria-hidden="true">
                            <Image circle thumbnail src="https://abs.twimg.com/sticky/default_profile_images/default_profile_bigger.png" style="display:none"/>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({

})

const  mapDispathToProps = (dispatch) => ({

})
export default connect(mapStateToProps, mapDispathToProps) (DashboardProfileCard);