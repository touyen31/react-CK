import React, {Component} from 'react';
import './detailTweet.css'
import ItemTweet from "./ItemTweet";
import connect from "react-redux/es/connect/connect";
import {Button, Modal} from "react-bootstrap";
import makeTransaction from '../../lib/makeTransaction'
import {getAvatar, getInteractComment, getInteractReaction, getmyname} from "../../redux/action";
import moment from "moment";
import {Image} from 'react-bootstrap'
import {Link} from "react-router-dom";

class DetailTweet extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: true,
            mycomment: '',
            myavatar: null,
            avatar: '',
            name: '',
            time: '',
            comments: [],
            reactions: [],
            myreaction: null
            /*
            noreacts: [],
            likes: [],
            loves: [],
            hahas: [],
            wows: [],
            sads: [],
            angrys: []
            */
        }

    }

    componentDidMount = async () => {
        let avatar = await getAvatar(this.props.data.account)
        let name = await getmyname(this.props.data.account)
        var time = this.props.data.time
        let comments = await getInteractComment(this.props.data.hash)
        let reactions = await getInteractReaction(this.props.data.hash)
        let myavatar = await getAvatar(this.props.authenticate.publickey)
        let myreaction = reactions.find(e => e._id === this.props.authenticate.publickey)
        console.log(myreaction)
        console.log(reactions)
        /*
        let noreacts = this.state.reactions.filter((react) => react.params.content.reaction === 0)
        let likes = this.state.reactions.filter((react) => react.params.content.reaction === 1)
        let loves = this.state.reactions.filter((react) => react.params.content.reaction === 2)
        let hahas = this.state.reactions.filter((react) => react.params.content.reaction === 3)
        let wows = this.state.reactions.filter((react) => react.params.content.reaction === 4)
        let sads = this.state.reactions.filter((react) => react.params.content.reaction === 5)
        let angrys = this.state.reactions.filter((react) => react.params.content.reaction === 6)
        this.setState({avatar, name, time, myavatar, comments, reactions, noreacts, likes, loves, hahas, wows, sads, angrys})
        */
        this.setState({avatar, name, time, comments, reactions, myavatar, myreaction})
    }


    handlecomment = async () => {

        let params = {
            object: this.props.data.hash,
            content: {
                type: 1,
                text: this.state.mycomment
            }
        }
        try {
            console.log(params)
            await makeTransaction(this.props.authenticate.publickey, 'interact', params, this.props.authenticate.secretkey)
            alert('thanh cong')
            this.setState({mycomment: ''})
        }
        catch (e) {
            console.log(e)
            alert('loi')
        }
    }

    handleReaction = async (reaction) => {
        let params = {
            object: this.props.data.hash,
            content: {
                type: 2,
                reaction: reaction
            }
        }
        try {
            console.log(params)
            await makeTransaction(this.props.authenticate.publickey, 'interact', params, this.props.authenticate.secretkey)
            //alert('Thành công')
            let reactions = await getInteractReaction(this.props.data.hash)
            console.log(reactions)
            this.setState({reactions: reactions})
        }
        catch (e) {
            console.log(e)
            //alert('Lỗi')
        }
        // const result = this.state.reactions.find(e => e.account === this.props.authenticate.publickey);
    }

    postReaction = async (reaction) => {

    }

    render() {
        return (
            <Modal show={this.props.show} onHide={() => this.props.closePopup()}>
                <Modal.Body>
                    <div className="information">
                        <Link to={'/info/' + this.props.data.account}>
                            <Image alt="avt" className="imageme" src={this.state.avatar}/>
                        </Link>
                        <div>
                            <div>
                                <Link to={'/info/' + this.props.data.account} className="user">{this.state.name}</Link>
                            </div>
                            <Link to={'/info/' + this.props.data.account} className="account">
                                <span>@{this.props.data.account}</span>
                            </Link>
                        </div>
                    </div>
                    <div className="contaner">
                        <div style={{marginLeft: 20}}>{this.props.data.params.content.text}</div>
                        <div style={{marginLeft: 20}}>{moment(this.state.time).format("DD/MM/YYYY HH:mm:ss")}</div>
                    </div>
                    <div className="line"/>
                    <div className="behavior">
                        <Link to="#" aria-selected="false" onClick={() => this.handleReaction(1)}>
                            <span aria-label={'Những người đã bày tỏ cảm xúc với Thích'}>
                                <img src="https://i0.wp.com/www.vectorico.com/wp-content/uploads/2018/02/Facebook-Like.png?resize=30%2C30"/>
                                <div className={"text " + (this.state.myreaction && this.state.myreaction.reaction === 1 ? 'myreaction like' : '' )}>
                                    {this.state.reactions.filter((react) => react.reaction === 1).length}
                                </div>
                            </span>
                        </Link>
                        <Link to="#" aria-selected="false" onClick={() => this.handleReaction(2)}>
                            <span aria-label={'Những người đã bày tỏ cảm xúc với Yêu thích'}>
                                <img src="https://i0.wp.com/www.vectorico.com/wp-content/uploads/2018/02/Facebook-Heart.png?resize=30%2C30"/>
                                <div className={"text " + (this.state.myreaction&& this.state.myreaction.reaction === 2 ? 'myreaction love-angry' : '' )}>
                                    {this.state.reactions.filter((react) => react.reaction === 2).length}
                                </div>
                            </span>
                        </Link>
                        <Link to="#" aria-selected="false" onClick={() => this.handleReaction(3)}>
                            <span aria-label={'Những người đã bày tỏ cảm xúc với Haha'}>
                                <img src="https://i0.wp.com/www.vectorico.com/wp-content/uploads/2018/02/Facebook-Haha.png?resize=30%2C30"/>
                                <div className={"text " + (this.state.myreaction&& this.state.myreaction.reaction === 3? 'myreaction haha-wow-sad' : '' )}>
                                    {this.state.reactions.filter((react) => react.reaction === 3).length}
                                </div>
                            </span>
                        </Link>
                        <Link to="#" aria-selected="false" onClick={() => this.handleReaction(4)}>
                            <span aria-label={'Những người đã bày tỏ cảm xúc với Wow'}>
                                <img src="https://i1.wp.com/www.vectorico.com/wp-content/uploads/2018/02/Facebook-Wow.png?resize=30%2C30"/>
                                <div className={"text " + (this.state.myreaction&& this.state.myreaction.reaction === 4 ? 'myreaction haha-wow-sad' : '' )}>
                                    {this.state.reactions.filter((react) => react.reaction === 4).length}
                                </div>
                            </span>
                        </Link>
                        <Link to="#" aria-selected="false" onClick={() => this.handleReaction(5)}>
                            <span aria-label={'Những người đã bày tỏ cảm xúc với Buồn'}>
                                <img src="https://i1.wp.com/www.vectorico.com/wp-content/uploads/2018/02/Facebook-Sad.png?resize=30%2C30"/>
                                <div className={"text " + (this.state.myreaction&& this.state.myreaction.reaction === 5 ? 'myreaction haha-wow-sad' : '' )}>
                                    {this.state.reactions.filter((react) => react.reaction === 5).length}
                                </div>
                            </span>
                        </Link>
                        <Link to="#" aria-selected="false" onClick={() => this.handleReaction(6)}>
                            <span aria-label={'Những người đã bày tỏ cảm xúc với Giận dữ'}>
                                <img src="https://i1.wp.com/www.vectorico.com/wp-content/uploads/2018/02/Facebook-Angry.png?resize=30%2C30"/>
                                <div className={"text " + (this.state.myreaction && this.state.myreaction.reaction === 6 ? 'myreaction love-angry' : '' )}>
                                    {this.state.reactions.filter((react) => react.reaction === 6).length}
                                </div>
                            </span>
                        </Link>

                        <div className="text count-comment">{this.state.comments ? this.state.comments.length : 0} bình
                            luận
                        </div>
                    </div>
                    <div className="line"/>
                    {this.state.comments.map((item) => <ItemTweet class="line" item={item}/>)}
                    <div className="posttweet">
                        {this.state.myavatar ? <img alt="avt" className="imageme" src={this.state.myavatar}/> :
                            <img alt="avt" className="imageme"
                                 src="https://abs.twimg.com/sticky/default_profile_images/default_profile_bigger.png"/>
                        }
                        <input className="textareatweet" value={this.state.mycomment}
                               onChange={(e) => this.setState({mycomment: e.target.value})}/>
                        <i className="far fa-share-square" style={{marginTop: 30}}
                           onClick={() => this.handlecomment()}/>
                    </div>

                </Modal.Body>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    comment: state.appReducer.comment,
    authenticate: state.appReducer.authenticate
})
const mapDispathToProps = (dispatch) => ({})
export default connect(mapStateToProps, mapDispathToProps)(DetailTweet);