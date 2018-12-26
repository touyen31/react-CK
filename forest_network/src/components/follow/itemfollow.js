import React, {Component} from 'react';
import './Follow.css'
import {Button, Image} from "react-bootstrap";
import {getAvatar, getFollowing, getmyname} from "../../redux/action";
import makeTransaction from '../../lib/makeTransaction'
import connect from "react-redux/es/connect/connect";
import {withRouter} from 'react-router-dom'
class Itemfollow extends Component {
    constructor(){
        super()
        this.state = {
            avatar:null,
            name:'',
            datafollowing:[],
            mydatafollowing:[]
        }
    }

    componentDidMount = async ()=>{
        const publickey= this.props.item;
        console.log(publickey)
        let avatar = await getAvatar(publickey)
        let name = await getmyname(publickey)
        let datafollowing = await getFollowing(publickey)
        this.setState({avatar, name, datafollowing})
    }
    async componentWillReceiveProps(newProps){
        const publickey= newProps.item;
        let avatar = await getAvatar(publickey)
        let name = await getmyname(publickey)
        let datafollowing = await getFollowing(publickey)
        this.setState({avatar, name, datafollowing})
    }
    handlePostFollow=async ()=> {
        let mydatafollowing = await getFollowing(this.props.authenticate.publickey)
        const result = mydatafollowing.find(e => e === this.props.item);
        console.log(result)
        if (result) {
            alert('đã followed rồi đừng follow nữa :(')
        } else {
            mydatafollowing = [...mydatafollowing, this.props.item]
            console.log(mydatafollowing)
            let params = {
                key: 'followings',
                value: {
                    addresses: mydatafollowing
                }
            }
            try {
                await makeTransaction(this.props.authenticate.publickey, 'update_account', params, this.props.authenticate.secretkey)
                alert('thanh cong')
            }
            catch (e) {
                console.log(e)
                alert('loi')
            }
                }

    }

    render() {
        const {item, type} = this.props
        return (
                <div className="content">
                    <div className="profiles">
                        <img className="profile-bgs" src="http://via.placeholder.com/300x70"/>
                        <div className="profile-contents">
                            <Image alt="avatar" className="avatar" src={this.state.avatar}/>
                            {this.props.type == 1 && <Button bsStyle="info" className="btnfollow">UnFollow</Button> }
                            {this.props.type == 2 && <Button bsStyle="info" className="btnfollow" onClick={()=>this.handlePostFollow()}>+Follow</Button> }
                            <i className="fas fa-ellipsis-v"></i>
                        </div>
                        <div className="info">
                            <div className="profile-names" onClick={() => this.props.history.push(`/info/${this.props.item}`)}>{this.state.name}</div>
                            <div className="profile-usernames">@</div>
                        </div>

                    </div>
                </div>
        );
    }
}
const mapStateToProps = (state) => ( {
    following:state.appReducer.following,
    authenticate: state.appReducer.authenticate
})

export default withRouter(connect(mapStateToProps,null)(Itemfollow));