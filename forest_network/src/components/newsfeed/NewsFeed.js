import React, {Component} from 'react'
import '../tweets/Tweets.css'
import {connect} from "react-redux";
import {
    getAllMyStatus,
    getAvatar,
    getFollowing,
    getStatusOnRelationship
} from "../../redux/action";
import makeTransaction from "../../lib/makeTransaction";
import {Button, Image} from "react-bootstrap";
import ItemTweet from "../tweets/ItemTweet";
import InfiniteScroll from 'react-infinite-scroller';

class NewsFeed extends Component {
    constructor(props) {
        super()
        this.state = {
            avatar: null,
            following: null,
            status: '',
            dataNewsFeed: [],
            pages: 0,
            isLoadMore: true
        }
    }

    componentDidMount = async () => {
        const myPublicKey = this.props.authenticate.publickey
        let avatar = await getAvatar(myPublicKey)
        let following = await getFollowing(myPublicKey)
        let dataNewsFeed = await getStatusOnRelationship(myPublicKey, this.state.pages)
        this.setState({avatar, following, dataNewsFeed: this.state.dataNewsFeed.concat(dataNewsFeed), pages: this.state.pages+1})
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

    loadFunc = async ()=> {
        let data = await getStatusOnRelationship(this.props.authenticate.publickey, this.state.pages)
        if (data.length === 0) {
            this.setState({isLoadMore: false})
        }
        this.setState({
            dataNewsFeed: this.state.dataNewsFeed.concat(data),
            pages: this.state.pages+1
        })
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
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadFunc}
                    hasMore={this.state.isLoadMore}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                    threshold={200}
                >
                    {this.state.dataNewsFeed.map((item, index) => <ItemTweet key={index} item={item}/>)}
                </InfiniteScroll>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    authenticate: state.appReducer.authenticate
})

export default connect(mapStateToProps)(NewsFeed);