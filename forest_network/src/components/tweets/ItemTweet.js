import React, {Component, Fragment} from 'react';
import './Tweets.css'
import './ItemTweet.css'
import DetailTweet from "./detailTweet";
import {getAvatar, getInteractComment, getInteractReaction, getmyname} from '../../redux/action'
import {dateFormat} from 'dateformat'
import {Image} from 'react-bootstrap'
import moment from 'moment'
import {Link} from "react-router-dom";

class ItemTweet extends Component {
    constructor() {
        super()
        this.state = {
            showPopup: false,
            avatar: null,
            name: '',
            time: null,
            comments: null,
            reactions: null
        }
    }

    componentDidMount = async () => {
        console.log(this.props.item.operation)
        let avatar = await getAvatar(this.props.item.account)
        let name = await getmyname(this.props.item.account)
        var time = this.props.item.time
        let comments = await getInteractComment(this.props.item.hash)
        let reactions = await getInteractReaction(this.props.item.hash)
        // time = dateFormat(time, "dddd, mm, yyyy, h:MM:ss TT")
        this.setState({avatar, name, time, comments, reactions})
    }


    closePopup = () => {
        this.setState({showPopup: false})
    }

    render() {
        const {item} = this.props
        return (
            <Fragment>
                <div className="content" onClick={() => this.setState({showPopup: !this.state.showPopup})}>
                    <div className="stream-item-header">
                        <Link to={'/info/' + item.account}>
                            <Image alt="avatar" className="imageme" src={this.state.avatar}></Image>
                        </Link>
                    </div>
                    <div>
                        <div className="behavior">
                            <Link to={'/info/' + item.account}>
                                <div className="textname">{this.state.name}</div>
                            </Link>
                            <div className="text">{moment(this.state.time).format("DD/MM/YYYY HH:mm:ss")}</div>
                        </div>
                        <div className="text">{item.params.content.text}</div>

                        <div className="behavior">
                            <i className="far fa-comment"></i>
                            <div className="text">{this.state.comments ? this.state.comments.length : 0}</div>
                            <i className="fas fa-retweet"></i>
                            <div className="text">0</div>
                            <i className="far fa-heart"></i>
                            <div className="text">{this.state.reactions ? this.state.reactions.length : 0}</div>
                        </div>
                    </div>
                    <div className="line"></div>
                </div>
                {
                    <DetailTweet show={this.state.showPopup} closePopup={this.closePopup} data={this.props.item}/>
                }
            </Fragment>
        );
    }
}

export default ItemTweet;