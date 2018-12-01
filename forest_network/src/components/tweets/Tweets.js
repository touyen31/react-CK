import React, {Component} from 'react';
import ItemTweet from "./ItemTweet";

class Tweets extends Component {
    render() {
        const {data} = this.props
        return (
            <div className="tweetsaa">
                <div>Tweets</div>
                {data.map((item, index)=><ItemTweet key={index} item={item}/>)}
            </div>
        );
    }
}

export default Tweets;