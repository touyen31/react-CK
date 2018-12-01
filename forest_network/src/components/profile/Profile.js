import React, {Component} from 'react';
import './Profile.css'
import connect from "react-redux/es/connect/connect";

class Profile extends Component {
    render() {
        return (
            <div>
                <ul id="profiles"></ul>
                <div className="profile template">
                    <img className="profile-bg" src={this.props.profile.background}/>
                    <div className="profile-content">
                        <img className="profile-img" src={this.props.profile.avatar}/>
                        <div className="profile-identity">
                            <div className="profile-name">{this.props.profile.name}</div>
                            <div className="profile-username">{this.props.profile.account}</div>
                        </div>
                    </div>
                    <ul className="user-stats">
                        <li className="stats-item tweets">
                            <div className="stat-title">TWEETS</div>
                            <div className="stat-value">{this.props.profile.tweets}</div>
                        </li>
                        <li className="stats-item following">
                            <div className="stat-title">FOLLOWING</div>
                            <div className="stat-value">{this.props.profile.following}</div>
                        </li>
                        <li className="stats-item followers">
                            <div className="stat-title">FOLLOWERS</div>
                            <div className="stat-value">{this.props.profile.follower}</div>
                        </li>
                    </ul>
                </div>
            </div>

        );
    }
}
const mapStateToProps = (state) => ( {
    profile:state.appReducer.profile
})
const mapDispathToProps = (dispatch)=>({

})
export default connect(mapStateToProps,mapDispathToProps)(Profile);