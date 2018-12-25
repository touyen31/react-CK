import React, {Component} from 'react';
import './Profile.css'
import connect from "react-redux/es/connect/connect";
import Follow from "../follow/Follow";
import Tweets from "../tweets/Tweets";
import {GETMYNAME, getmyname} from '../../redux/action'
import {Route}from'react-router-dom'
import makeTransaction from '../../lib/makeTransaction'
import {Button, Col, FormControl, Glyphicon, Grid, Image} from "react-bootstrap";
import axios from 'axios'


class Profile extends Component {
    constructor(props){
        super()
        this.state={
            checkfollowing:false,
            checkfollower:false,
            checktweets:true,
            checkEditName:true,
            name:'',
            file: null
        }
    }


    componentDidMount(){
        this.getmyname()
        //this.props.getmyname(this.props.authenticate.publickey)
    }

    getmyname(){
        const url ='http://localhost:5000/account/'+this.props.authenticate.publickey+'/name'
        return axios.get(url)
            .then(res=>{
               this.setState({name:res.data.Name})
            })
            .catch(e=>{
                alert(e.message)
            })
    }

    handleClickFollowing(){
        this.props.history.push('/info/following')
    }
    handleClickFollower(){
        this.props.history.push('/info/follower')
    }
    handleClickTweets(){
        this.props.history.push('/info/')
    }
    handleClickEdit(){
        this.setState({checkEditName:!this.state.checkEditName})
    }
    handleUpdateProfile(e){
        console.log(e.target.value)
        this.setState({name:e.target.value})
    }
    async handleSave(){

        let params = {
            key: 'name',
            value: this.state.name
        }
        try {
            await makeTransaction(this.props.authenticate.publickey, 'update_account', params, this.props.authenticate.secretkey)
            this.getmyname();
            alert('thanh cong')
        }catch (e) {
            alert('loi')
        }
        this.setState({checkEditName:!this.state.checkEditName})
    }

    handleFileChange = (event) => {
        if(event.target.files && event.target.files[0]){
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({file: e.target.result})
            }
            reader.readAsDataURL(event.target.files[0])
        }
    }
    uphinh = async () => {
        // let flag = 'data:image/jpeg;base64,';
        // let params = {
        //     key: 'picture',
        //     value: this.state.file.slice(flag.length)
        // }
        // try{
        //     await makeTransaction('GDBES2U6KZW5FJ7IRPTS4PFBYRTAXDMIADQQY3VLY2QNNXK3Z3NMM3E7', 'update_account', params, 'SAJDP4NOQYTFIK3YYUIKOPWG5WZZ37GSVT4AQ6GHFTSLLWSPFMHKCWMW')
        //     alert('thanh cong')
        // }
        // catch (e) {
        //     alert('loi')
        // }
        // let params = {
        //     object: 'CCB986DD05618567902B8E197B430B745D94312C6C4CFE0305135A2F3B924D78',
        //     content: {
        //         type: 1,
        //         text: 'day la comment'
        //     }
        // }
        // try{
        //     await makeTransaction('GDBES2U6KZW5FJ7IRPTS4PFBYRTAXDMIADQQY3VLY2QNNXK3Z3NMM3E7', 'interact', params, 'SAJDP4NOQYTFIK3YYUIKOPWG5WZZ37GSVT4AQ6GHFTSLLWSPFMHKCWMW')
        //     alert('thanh cong')
        // }
        // catch (e) {
        //     console.log(e)
        //     alert('loi')
        // }
        // let params = {
        //     object: 'CCB986DD05618567902B8E197B430B745D94312C6C4CFE0305135A2F3B924D78',
        //     content: {
        //         type: 2,
        //         reaction: 3
        //     }
        // }
        // try{
        //     await makeTransaction('GDBES2U6KZW5FJ7IRPTS4PFBYRTAXDMIADQQY3VLY2QNNXK3Z3NMM3E7', 'interact', params, 'SAJDP4NOQYTFIK3YYUIKOPWG5WZZ37GSVT4AQ6GHFTSLLWSPFMHKCWMW')
        //     alert('thanh cong')
        // }
        // catch (e) {
        //     console.log(e)
        //     alert('loi')
        // }

        let params = {
            key: 'followings',
            value: {
                addresses: ['GDMNG3PLGUMPHXPPMRZ7EQRMT34F4JU6574OZIQL3LIK5P76CVW5QMTL']
            }
        }
        try{
            await makeTransaction('GDBES2U6KZW5FJ7IRPTS4PFBYRTAXDMIADQQY3VLY2QNNXK3Z3NMM3E7', 'update_account', params, 'SAJDP4NOQYTFIK3YYUIKOPWG5WZZ37GSVT4AQ6GHFTSLLWSPFMHKCWMW')
            alert('thanh cong')
        }
        catch (e) {
            console.log(e)
            alert('loi')
        }
    }
    render() {

        return (
            <div >
                <div className="profile template">
                    <Image circle thumbnail alt="avt" className="profile-avatar" src={this.props.profile.avatar}/>
                    <input type='file' onChange={this.handleFileChange} style={{position: 'absolute', top: 200, left: 100}} />
                    <button style={{position: 'absolute', top: 300, left: 100}} onClick={() => this.uphinh()}>Luu</button>
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
                            <Route exact path={'/info/following'} render={() =><Follow title={'Danh sách following'} data={this.props.following}/>}/>
                            <Route  exact path={'/info/follower'} render={() =><Follow title ={'Danh sách follower'}  data={this.props.follower}/>}/>
                            <Route exact path={'/info/'} render={() => <Tweets data={this.props.tweets}/>}/>

                            {/*{this.state.checktweets && <Tweets data={this.props.tweets}/>}*/}
                            {/*{this.state.checkfollowing && <Follow title={'Danh sách following'} data={this.props.following}/>}*/}
                            {/*{this.state.checkfollower && <Follow title ={'Danh sách follower'}  data={this.props.follower}/>}*/}
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
    tweets:state.appReducer.tweets,
    authenticate:state.appReducer.authenticate
})
const mapDispathToProps = (dispatch)=>({

    // updateprofile: (profile)=>(dispatch(updateprofile(profile)))
    getmyname:(publickey) => dispatch(getmyname(publickey))

})
export default connect(mapStateToProps,mapDispathToProps)(Profile);