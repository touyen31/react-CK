import React, {Component} from 'react';

class Itemfollow extends Component {
    render() {
        const {item} = this.props
        return (
                <div className="content">
                    <img alt="avatar" className="avatar" src={item.avatar}/>
                    <div className="info">
                        <div>{item.name}</div>
                        <div>{item.account}</div>
                    </div>
                </div>
        );
    }
}

export default Itemfollow;