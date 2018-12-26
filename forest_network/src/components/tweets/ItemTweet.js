import React, {Component, Fragment} from 'react';
import './Tweets.css'
import DetailTweet from "./detailTweet";
import {getAvatar, getmyname} from '../../redux/action'
import {dateFormat } from 'dateformat'
import {Image} from 'react-bootstrap'

class ItemTweet extends Component {
    constructor(){
        super()
        this.state = {
            showPopup: false,
            avatar:null,
            name:'',
            time:null
        }
    }

    componentDidMount = async ()=>{
        let avatar = await getAvatar(this.props.item.account)
        let name = await getmyname(this.props.item.account)
        var time = this.props.item.time
        // time = dateFormat(time, "dddd, mm, yyyy, h:MM:ss TT")
        this.setState({avatar, name, time})
    }



    render() {
        const {item} =this.props
        return (
            <Fragment >
                <div className="content"  onClick={()=> this.setState({showPopup:true})}>
                    <Image alt="avatar" className="imageme" src={this.state.avatar}></Image>
                    <div>
                        <div className="behavior">
                            <div className="textname">{this.state.name}</div>
                            {/*<div className="text">{item.account}</div>*/}
                            <div className="text">{this.state.time}</div>
                        </div>
                        <div className="text">{item.params.content.text}</div>

                        <div className="behavior">
                            <i className="far fa-comment"></i>
                            <div className="text">0</div>
                            <i className="fas fa-retweet"></i>
                            <div className="text">0</div>
                            <i className="far fa-heart"></i>
                            <div className="text">0</div>
                        </div>
                    </div>
                    <div className="line"></div>
                </div>
                {
                    this.state.showPopup && <DetailTweet/>
                }
            </Fragment>
        );
    }
}
export default ItemTweet;