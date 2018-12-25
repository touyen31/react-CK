import React, {Component} from 'react';
import './DashboardProfileCard.css'
import {Image} from "react-bootstrap";
import {connect} from "react-redux";


class DashboardProfileCard extends Component {
    constructor() {
        super()
        this.state = {
            name:'Name',
            username:'Username',
            countTweets: 0,
            countFollowing: 0
        }
    }

    render() {
        return (
            <div className="DashboardProFileCard module">
                <a className="DashboardProfileCard-bg u-bgUserColor u-block" href="#" tabIndex="-1" aria-hidden="true" rel="noopener"/>

                <div className="DashboardProFileCard-content">
                    <div className="DashboardProFileCard-avatarContainer">
                        <a className="DashboardProFileCard-avatarLink u-inlineBlock" href="#" tabIndex="-1" aria-hidden="true">
                            <Image circle thumbnail src="https://abs.twimg.com/sticky/default_profile_images/default_profile_bigger.png" style="display:none"/>
                        </a>
                    </div>
                    <div className="DashboardProfileCard-userFields u-textTruncate">
                        <a className="u-textInheritColor" href="#">{this.state.name}</a>
                    </div>
                    <span className="u-inlineBlock u-dir">
                        <a className="DashboardProfileCard-screennameLink u-linkComplex u-linkClean" href="#">
                            <span className="username u-dir" dir="ltr">
                                "@"
                                <b>{this.state.username}</b>
                            </span>
                        </a>
                    </span>
                </div>

                <div className="ProfileCardStats">
                    <ul class="ProfileCardStats-statList Arrange Arrange--bottom Arrange--equal">
                        <li className="ProfileCardStats-stat Arrange-sizeFit">
                            <a className="ProfileCardStats-statLink u-textUserColor u-linkClean u-block" href="#">
                                <span className="ProfileCardStats-statLabel u-block">Tweets</span>
                                <span className="ProfileCardStats-statValue">{this.state.countTweets}</span>
                            </a>
                        </li>
                        <li className="ProfileCardStats-stat Arrange-sizeFit">
                            <a className="ProfileCardStats-statLink u-textUserColor u-linkClean u-block" href="#">
                                <span className="ProfileCardStats-statLabel u-block">Following</span>
                                <span className="ProfileCardStats-statValue">{this.state.countFollowing}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    profile:state.appReducer.profile
})

export default connect(mapStateToProps) (DashboardProfileCard);