import React, {Component} from 'react';
import ItemTweet from "./ItemTweet";
import {Button, Image} from "react-bootstrap";
import  {getAvatar, getAllMyStatus} from '../../redux/action'
import makeTransaction from '../../lib/makeTransaction'
import connect from "react-redux/es/connect/connect";

class Tweets extends Component {
    constructor(props) {
        super()
        this.state={
            avatar:null,
            status:null,
            dataStatus:[]
        }
    }
    componentDidMount = async ()=>{
        const publickey = this.props.account
        let avatar = await getAvatar(publickey)
        let status = await getAllMyStatus(publickey)
        this.setState({avatar, dataStatus:status})
    }
    async componentWillReceiveProps(newProps){
        const publickey = newProps.account
        let avatar = await getAvatar(publickey)
        let status = await getAllMyStatus(publickey)
        this.setState({avatar, dataStatus:status})
    }

    handlePostStatus =async ()=>{
        let params = {
            content:{
                type:1,
                text:this.state.status
            },
            keys:[]
        }
        try{
            await makeTransaction(this.props.authenticate.publickey, 'post', params,this.props.authenticate.secretkey)
            alert('thanh cong')
            let data = await getAllMyStatus(this.props.account)
            console.log(data)
            this.setState({dataStatus:data, status:''})

        }
        catch (e) {
            console.log(e)
            alert('loi')
        }
    }
    render() {
        // const {data} = this.props
        console.log(this.state)
        return (
            <div className="tweetsaa">
                <div className="textname">Tweets</div>
                {this.props.account === this.props.authenticate.publickey &&
                <div className="posttweet">
                    <Image alt="avt" className="imageme" src={this.state.avatar}/>
                    <input className="textareatweet" placeholder="new tweet @@" value={this.state.status} onChange={(e)=>{this.setState({status:e.target.value})}}></input>
                    <Button className="btnfollow" onClick={()=>this.handlePostStatus()}>Post</Button>
                </div>
                }
                {this.state.dataStatus.map((item, index)=><ItemTweet key={index} item={item}/>)}
            </div>
        );
    }
}
const mapStateToProps = (state) => ( {
    authenticate:state.appReducer.authenticate
})

export default connect(mapStateToProps,null)(Tweets);