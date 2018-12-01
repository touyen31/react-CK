import React, {Component} from 'react';
import './Profile.css'
import connect from "react-redux/es/connect/connect";
import Follow from "../follow/Follow";
import Tweets from "../tweets/Tweets";
import {updateprofile} from '../action'


class Profile extends Component {
    constructor(props){
        super()
        this.state={
            checkfollowing:false,
            checkfollower:false,
            checktweets:false,
            checkEditName:true,
            name:''
        }
    }
    componentDidMount(){
        this.setState({name:this.props.profile.name})
    }
    handleClickFollowing(){
        this.setState({checkfollowing:!this.state.checkfollowing, checkfollower:false})
    }
    handleClickFollower(){
        this.setState({checkfollowing:false, checkfollower:!this.state.checkfollower})
    }
    handleClickTweets(){
        this.setState({checktweets:!this.state.checktweets})
    }
    handleClickEdit(){
        this.setState({checkEditName:!this.state.checkEditName})
    }
    handleUpdateProfile(e){
        console.log(e.target.value)
        this.setState({name:e.target.value})
    }
    handleSave(){
        this.setState({checkEditName:!this.state.checkEditName})
        this.props.updateprofile(this.state.name)
    }
    render() {
        return (
            <div className="profilewaper">
                <div className="profile template">
                    <img className="profile-bg" src={this.props.profile.background}/>
                    <div className="profile-content">
                        <img className="profile-img" src={this.props.profile.avatar}/>
                        <div className="profile-identity">
                            <div style={{display:'flex'}}>
                                <input className="profile-name"
                                       value={this.state.name}
                                       disabled={this.state.checkEditName} onChange={(e)=>this.handleUpdateProfile(e)}/>
                                {this.state.checkEditName ? <i className="fas fa-edit" onClick={()=>this.handleClickEdit()}></i>
                                : <button onClick={()=> this.handleSave()}>Save</button>
                                }

                            </div>
                            <div className="profile-username">{this.props.profile.account}</div>
                        </div>
                    </div>
                    <ul className="user-stats">
                        <li className="stats-item tweets" onClick={()=>this.handleClickTweets()}>
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
                    {this.state.checkfollowing && <Follow title={'Danh sách following'} data={this.props.following}/>}
                    {this.state.checkfollower && <Follow title ={'Danh sách follower'}  data={this.props.follower}/>}
                </div>
                {this.state.checktweets && <Tweets data={this.props.tweets}/>}

            </div>

        );
    }
}
const mapStateToProps = (state) => ( {
    profile:state.appReducer.profile,
    following:state.appReducer.following,
    follower:state.appReducer.follower,
    tweets:state.appReducer.tweets
})
const mapDispathToProps = (dispatch)=>({

    updateprofile: (profile)=>(dispatch(updateprofile(profile)))

})
export default connect(mapStateToProps,mapDispathToProps)(Profile);