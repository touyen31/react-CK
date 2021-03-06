import React, {Component} from 'react';
import './Follow.css'
import Itemfollow from "./itemfollow";

class Follow extends Component {
    render() {
        const {data, type} = this.props
        return (
            <div className="follow">
                {/*<div className="title">{this.props.title}</div>*/}
                {data.map((item, index)=> <Itemfollow key={index} item={item} type={type}/>)}
            </div>
        );
    }
}

export default Follow;