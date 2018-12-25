import React, {Component} from 'react';
import ItemTweet from "./ItemTweet";
import {Image} from "react-bootstrap";

import  {getAvatar} from '../../redux/action'

class Tweets extends Component {
    constructor(props) {
        super()
        this.state={
            avatar:null
        }
    }
    componentDidMount = async ()=>{
        let avatar = await getAvatar(this.props.account)
        this.setState({avatar})
    }
    render() {
        const {data} = this.props
        return (
            <div className="tweetsaa">
                <div className="textname">Tweets</div>
                <div className="posttweet">
                    <Image alt="avt" className="imageme" src={this.state.avatar}/>
                    <input className="textareatweet"></input>
                </div>
                {data.map((item, index)=><ItemTweet key={index} item={item}/>)}
            </div>
        );
    }
}

export default Tweets;