import React, {Component} from 'react';
import './Profile.css'
import connect from "react-redux/es/connect/connect";
import Follow from "../follow/Follow";

class Profile extends Component {
    constructor(props){
        super()
        this.state={
            checkfollowing:false,
            checkfollower:false
        }
    }
    handleClickFollowing(){
        this.setState({checkfollowing:true, checkfollower:false})
    }
    handleClickFollower(){
        this.setState({checkfollowing:false, checkfollower:true})
    }
    render() {
        return (
            <div>
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
                        <li className="stats-item following" onClick={()=>this.handleClickFollowing()}>
                            <div className="stat-title">FOLLOWING</div>
                            <div className="stat-value">{this.props.profile.following}</div>
                        </li>
                        <li className="stats-item followers" onClick={()=>this.handleClickFollower()}>
                            <div className="stat-title">FOLLOWERS</div>
                            <div className="stat-value">{this.props.profile.follower}</div>
                        </li>
                    </ul>
                </div>
                {this.state.checkfollowing && <Follow title={'Danh sách following'} data={this.props.following}/>}
                {this.state.checkfollower && <Follow title ={'Danh sách follower'}  data={this.props.follower}/>}
            </div>

        );
    }
}
const mapStateToProps = (state) => ( {
    profile:state.appReducer.profile,
    following:state.appReducer.following,
    follower:state.appReducer.follower
})
const mapDispathToProps = (dispatch)=>({

})
export default connect(mapStateToProps,mapDispathToProps)(Profile);