import React, {Component} from 'react';
import './Follow.css'

class Follow extends Component {
    render() {
        return (
            <div className="follow">
                <div className="title">Danh sách follower</div>
                <div className="content">
                    <img className="avatar" src="http://lorempixel.com/70/70"/>
                    <div className="info">
                        <div>aaaa</div>
                        <div>bbbbbb</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Follow;