import React, {Component} from 'react';
import './Tweets.css'

class ItemTweet extends Component {
    render() {
        const {item} =this.props
        return (
            <div className="content">
                <img src={item.avatar}></img>
                <div>
                    <div className="behavior">
                        <div className="textname">{item.name}</div>
                        <div className="text">{item.account}</div>
                    </div>
                    <div className="text">{item.content}</div>

                    <div className="behavior">
                        <i className="fas fa-reply"></i>
                        <div className="text">{item.comment}</div>
                        <i className="fas fa-heart"></i>
                        <div className="text">{item.react}</div>
                        <i className="fas fa-share-alt-square"></i>
                        <div className="text">{item.share}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ItemTweet;