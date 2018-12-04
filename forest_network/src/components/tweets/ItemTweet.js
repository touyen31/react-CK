import React, {Component, Fragment} from 'react';
import './Tweets.css'
import DetailTweet from "./detailTweet";
class ItemTweet extends Component {
    constructor(){
        super()
        this.state = {
            showPopup: false
        }
    }
    render() {
        const {item} =this.props
        return (
            <Fragment >
                <div className="content"  onClick={()=> this.setState({showPopup:true})}>
                    <img alt="avatar" className="imageme" src={item.avatar}></img>
                    <div>
                        <div className="behavior">
                            <div className="textname">{item.name}</div>
                            <div className="text">{item.account}</div>
                            <div className="text">{item.time}</div>
                        </div>
                        <div className="text">{item.content}</div>

                        <div className="behavior">
                            <i className="far fa-comment"></i>
                            <div className="text">{item.comment}</div>
                            <i className="fas fa-retweet"></i>
                            <div className="text">{item.react}</div>
                            <i className="far fa-heart"></i>
                            <div className="text">{item.share}</div>
                        </div>
                    </div>
                </div>
                {
                    this.state.showPopup &&
                    <div className='popup'>
                        <DetailTweet/>
                        <i className="fas fa-times" style={{marginLeft:70}} onClick={()=> this.setState({showPopup:false})}></i>
                    </div>
                }
            </Fragment>
        );
    }
}
export default ItemTweet;