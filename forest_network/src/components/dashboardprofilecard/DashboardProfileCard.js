import React, {Component} from 'react';
import './DashboardProfileCard.css'
import {Image} from "react-bootstrap";
import {getAllMyStatus, getAvatar, getFollower, getFollowing, getinfo, getmyname} from "../../redux/action";
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";

class DashboardProfileCard extends Component {
    constructor() {
        super()
        this.state = {
            name:'Name',
            username:'Username',
            avatar: null,
            countTweets: 0,
            countFollowing: 0
        }
    }

    componentDidMount = async ()=> {
        const publicKey = this.props.authenticate.publickey
        let name = await getmyname(publicKey)
        let username = publicKey
        let avatar = await getAvatar(publicKey)
        let tweets = await getAllMyStatus(publicKey)
        let following = await getFollowing(publicKey)
        let countTweets = tweets.length
        let countFollowing = following.length
        this.setState({name, username, avatar, countTweets, countFollowing})
    }

    render() {
        return (
            <div className="DashboardProfileCard module">
                <Link to={"/info/"+ this.state.username} className="DashboardProfileCard-bg u-bgUserColor u-block"  tabIndex="-1" aria-hidden="true" rel="noopener">
                    <Image src=""/>
                </Link>

                <div className="DashboardProfileCard-content">
                    <div className="DashboardProfileCard-avatarContainer">
                        <Link to={'/info/' + this.state.username} className="DashboardProfileCard-avatarLink u-inlineBlock" tabIndex="-1" aria-hidden="true">
                            {this.state.avatar ?
                                <Image circle thumbnail src={this.state.avatar}/>
                                : <Image circle thumbnail src="https://abs.twimg.com/sticky/default_profile_images/default_profile_bigger.png"/>
                            }
                        </Link>
                    </div>
                    <div className="DashboardProfileCard-userFields account-group">
                        <div className="DashboardProfileCard-name u-textTruncate">
                            <Link to={"/info/"+ this.state.username} className="u-textInheritColor" rel="noopener">{this.state.name}</Link>
                        </div>
                        <span className="u-inlineBlock u-dir">
                            <Link to={'/info/' + this.state.username} className="DashboardProfileCard-screennameLink u-linkComplex u-linkClean" rel="noopener">
                                <span className="username u-dir" dir="ltr">
                                    @
                                    {this.state.username}
                                </span>
                            </Link>
                        </span>
                    </div>

                    <div className="ProfileCardStats">
                        <ul className="ProfileCardStats-statList Arrange Arrange--bottom Arrange--equal">
                            <li className="ProfileCardStats-stat Arrange-sizeFit">
                                <Link to={'/info/' + this.state.username} className="ProfileCardStats-statLink u-textUserColor u-linkClean u-block" >
                                    <span className="ProfileCardStats-statLabel u-block">Tweets</span>
                                    <span className="ProfileCardStats-statValue">{this.state.countTweets}</span>
                                </Link>
                            </li>
                            <li className="ProfileCardStats-stat Arrange-sizeFit">
                                <Link to={'/info/' + this.state.username + '/following'} className="ProfileCardStats-statLink u-textUserColor u-linkClean u-block">
                                    <span className="ProfileCardStats-statLabel u-block">Following</span>
                                    <span className="ProfileCardStats-statValue">{this.state.countFollowing}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    authenticate:state.appReducer.authenticate
})

export default connect(mapStateToProps)(DashboardProfileCard);