import React, {Component} from 'react';
import './Follow.css'
import {Button, Image} from "react-bootstrap";
import {getAvatar, getmyname} from "../../redux/action";

class Itemfollow extends Component {
    constructor(){
        super()
        this.state = {
            avatar:null,
            name:''
        }
    }

    componentDidMount = async ()=>{
        let avatar = await getAvatar(this.props.item)
        let name = await getmyname(this.props.item)
        this.setState({avatar, name})
    }

    render() {
        const {item} = this.props
        return (
                <div className="content">
                    <div className="profiles">
                        <img className="profile-bgs" src="http://via.placeholder.com/300x70"/>
                        <div className="profile-contents">
                            <Image alt="avatar" className="avatar" src={this.state.avatar}/>
                            <Button bsStyle="info" className="btnfollow">Following</Button>
                            <i className="fas fa-ellipsis-v"></i>
                        </div>
                        <div className="info">
                            <div className="profile-names">{this.state.name}</div>
                            <div className="profile-usernames">@</div>
                        </div>

                    </div>
                </div>
        );
    }
}

export default Itemfollow;