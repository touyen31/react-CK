import React, {Component} from 'react';
import './Profile.css'
import connect from "react-redux/es/connect/connect";
import Follow from "../follow/Follow";
import Tweets from "../tweets/Tweets";
import {updateprofile} from '../action'
import {Button, Col, FormControl, Glyphicon, Grid, Image} from "react-bootstrap";


class Profile extends Component {
    constructor(props){
        super()
        this.state={
            checkfollowing:false,
            checkfollower:false,
            checktweets:true,
            checkEditName:true,
            name:''
        }
    }
    componentDidMount(){
        this.setState({name:this.props.profile.name})
    }
    handleClickFollowing(){
        this.setState({checkfollowing:true, checkfollower:false, checktweets:false})
    }
    handleClickFollower(){
        this.setState({checkfollowing:false, checkfollower:true, checktweets:false})
    }
    handleClickTweets(){
        this.setState({checktweets:true, checkfollowing:false, checkfollower:false })
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
            <div >
                <div className="profile template">
                    <Image circle thumbnail alt="avt" className="profile-avatar" src={this.props.profile.avatar}/>
                    <Image alt="wallpaper" className="profile-bg" src={this.props.profile.background}/>
                    <div className="profile-navbar">
                        <ul className="user-stats">
                            <li className="stats-item tweets" onClick={()=>this.handleClickTweets()}>
                                <div className="stat-title">Tweets</div>
                                <div className="stat-value">{this.props.profile.tweets}</div>
                            </li>
                            <li className="stats-item following" onClick={()=>this.handleClickFollowing()}>
                                <div className="stat-title">Following</div>
                                <div className="stat-value">{this.props.profile.following}</div>
                            </li>
                            <li className="stats-item followers" onClick={()=>this.handleClickFollower()}>
                                <div className="stat-title">Followers</div>
                                <div className="stat-value">{this.props.profile.follower}</div>
                            </li>
                        </ul>
                    </div>
                    <Grid className="profile-content">
                        <Col sm={6} md={3}>
                            <div className="profile-identity">
                                <div style={{display:'flex'}}>
                                    <FormControl className="profile-name"
                                           value={this.state.name}
                                           disabled={this.state.checkEditName} onChange={(e)=>this.handleUpdateProfile(e)}/>
                                    {this.state.checkEditName ? <Glyphicon glyph="edit" onClick={()=>this.handleClickEdit()}/>
                                        : <Button onClick={()=> this.handleSave()}>Save</Button>
                                    }
                                </div>
                                <div className="profile-username">{this.props.profile.account}</div>
                            </div>
                        </Col>
                        <Col sm={6} md={6} className="profile-middle">
                            {this.state.checktweets && <Tweets data={this.props.tweets}/>}
                            {this.state.checkfollowing && <Follow title={'Danh sách following'} data={this.props.following}/>}
                            {this.state.checkfollower && <Follow title ={'Danh sách follower'}  data={this.props.follower}/>}
                        </Col>
                        <Col sm={6} md={3}>

                        </Col>
                    </Grid>
                </div>


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