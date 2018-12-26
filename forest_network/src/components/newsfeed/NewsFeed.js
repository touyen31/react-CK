import React, {Component} from 'react'
import '../tweets/Tweets.css'
import {connect} from "react-redux";
import {getAllMyStatus, getAllStatusRelationship, getAvatar, getFollowing} from "../../redux/action";
import makeTransaction from "../../lib/makeTransaction";
import {Button, Image} from "react-bootstrap";
import ItemTweet from "../tweets/ItemTweet";

class NewsFeed extends Component {
    constructor(props) {
        super()
        this.state = {
            avatar: null,
            following: null,
            status: '',
            dataNewsFeed: []
        }
    }

    componentDidMount = async () => {
        const myPublicKey = this.props.authenticate.publickey
        let avatar = await getAvatar(myPublicKey)
        let following = await getFollowing(myPublicKey)
        let dataNewsFeed = await getAllStatusRelationship(myPublicKey)
        this.setState({avatar, following, dataNewsFeed})
        /*
        let dataNewsFeed = await getAllMyStatus(myPublicKey)
        this.setState({avatar, following, dataNewsFeed})

        following.map( async account => {
            let data = await getAllMyStatus(account)
            let newDataNewsFeed = this.state.dataNewsFeed.concat(data)
            newDataNewsFeed.sort((a, b) =>{
                return new Date(b.time) - new Date(a.time)
            })
            this.setState({dataNewsFeed:newDataNewsFeed})
        })
        */
        /*
        let sortedDataNewsFeed = this.state.dataNewsFeed
        sortedDataNewsFeed.sort((a, b) =>{
            return new Date(b.date) - new Date(a.date)
        })
        console.log(sortedDataNewsFeed)
        this.setState({dataNewsFeed:sortedDataNewsFeed})
        */
    }


    handlePostStatus = async () => {
        let params = {
            content: {
                type: 1,
                text: this.state.status
            },
            keys: []
        }
        try {
            await makeTransaction(this.props.authenticate.publickey, 'post', params, this.props.authenticate.secretkey)
            alert('Thành công')
            let data = await getAllMyStatus(this.props.authenticate.publickey)
            console.log(data)
            this.setState({dataNewsFeed: data, status: ''})

        }
        catch (e) {
            console.log(e)
            alert('Lỗi')
        }
    }

    render() {
        return (
            <div className="tweetsaa">
                <div className="textname">Tweets</div>
                <div className="posttweet">
                    <Image alt="avt" className="imageme" src={this.state.avatar}/>
                    <input className="textareatweet" placeholder="new tweet @@" value={this.state.status} onChange={(e) => {this.setState({status: e.target.value})}}/>
                    <Button className="btnfollow" onClick={() => this.handlePostStatus()}>Post</Button>

                </div>
                {this.state.dataNewsFeed.map((item, index) => <ItemTweet key={index} item={item}/>)}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    authenticate: state.appReducer.authenticate
})

export default connect(mapStateToProps)(NewsFeed);