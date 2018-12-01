import React, {Component} from 'react';
import './Profile.css'

class Profile extends Component {
    render() {
        return (
            <div>
                <ul id="profiles"></ul>
                <div className="profile template">
                    <img className="profile-bg" src="http://lorempixel.com/300/70"/>
                    <div className="profile-content">
                        <img className="profile-img" src="http://lorempixel.com/70/70"/>
                            <div className="profile-identity">
                                <div className="profile-name">Andrew Walpole</div>
                                <div className="profile-username">@walpolea</div>
                            </div>
                    </div>
                    <ul className="user-stats">
                        <li className="stats-item tweets">
                            <div className="stat-title">TWEETS</div>
                            <div className="stat-value">3411</div>
                        </li>
                        <li className="stats-item following">
                            <div className="stat-title">FOLLOWING</div>
                            <div className="stat-value">418</div>
                        </li>
                        <li className="stats-item followers">
                            <div className="stat-title">FOLLOWERS</div>
                            <div className="stat-value">322</div>
                        </li>
                    </ul>
                </div>
            </div>

        );
    }
}

export default Profile;