import React, {Component} from 'react';
import ItemTweet from "./ItemTweet";

class Tweets extends Component {
    render() {
        const {data} = this.props
        return (
            <div className="tweetsaa">
                <div className="textname">Tweets</div>
                <div className="posttweet">
                    <img alt="avt" className="imageme" src="http://via.placeholder.com/50x50"/>
                    <input className="textareatweet"></input>
                </div>
                {data.map((item, index)=><ItemTweet key={index} item={item}/>)}
            </div>
        );
    }
}

export default Tweets;