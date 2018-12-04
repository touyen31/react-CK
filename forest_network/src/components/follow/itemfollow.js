import React, {Component} from 'react';
import './Follow.css'
import {Button} from "react-bootstrap";

class Itemfollow extends Component {
    render() {
        const {item} = this.props
        return (
                <div className="content">
                    <div className="profiles">
                        <img className="profile-bgs" src="http://via.placeholder.com/300x70"/>
                        <div className="profile-contents">
                            <img alt="avatar" className="avatar" src={item.avatar}/>
                            <Button bsStyle="info" className="btnfollow">Following</Button>
                            <i className="fas fa-ellipsis-v"></i>
                        </div>
                        <div className="info">
                            <div className="profile-names">{item.name}</div>
                            <div className="profile-usernames">{item.account}</div>
                        </div>

                    </div>
                </div>
        );
    }
}

export default Itemfollow;