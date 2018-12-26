import React, {Component} from 'react';
import './detailTweet.css'
import ItemTweet from "./ItemTweet";
import connect from "react-redux/es/connect/connect";
import {Button, Modal} from "react-bootstrap";
import makeTransaction from '../../lib/makeTransaction'
import {getAvatar, getInteractComment, getmyname} from "../../redux/action";
import moment from "moment";
import {Image} from 'react-bootstrap'
class DetailTweet extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show : true,
            mycomment:'',
            myavatar:null,
            avatar:'',
            name:'',
            time:'',
            datacomment:[]
        }

    }

    componentDidMount = async ()=>{
        let avatar = await getAvatar(this.props.data.account)
        let name = await getmyname(this.props.data.account)
        var time = this.props.data.time
        let comment = await getInteractComment(this.props.data.hash)
        let myavatar = await getAvatar(this.props.authenticate.publickey)
        this.setState({avatar, name, time, datacomment:comment, myavatar})
    }
    handlecomment=async ()=>{
        let params = {
            object: this.props.data.hash,
            content: {
                type: 1,
                text: this.state.mycomment
            }
        }
        try{
            console.log(params)
            await makeTransaction(this.props.authenticate.publickey, 'interact', params,this.props.authenticate.secretkey)
            alert('thanh cong')
            this.setState({mycomment:''})
        }
        catch (e) {
            console.log(e)
            alert('loi')
        }
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={()=> this.props.closePopup()}>
                <Modal.Body>
                    <div className="information">
                        <Image alt="avt" className="imageme" src={this.state.avatar}/>
                        <div>
                            <div className="user">{this.state.name}</div>
                            <div className="account">@banhcom</div>

                        </div>
                    </div>
                    <div className="contaner">
                        <div style={{marginLeft:20}}>{this.props.data.params.content.text}</div>
                        <div style={{marginLeft:20}}>{moment(this.state.time).format("DD/MM/YYYY HH:mm:ss")}</div>
                    </div>
                    <div className="line"></div>
                    <div className="behavior">
                        <i className="far fa-comment"></i>
                        <i className="fas fa-retweet"></i>
                        <i className="far fa-heart"></i>
                    </div>
                    <div className="line"></div>
                    {this.state.datacomment.map((item)=><ItemTweet item={item}/>)}
                    <div className="posttweet">
                        {this.state.myavatar ? <img alt="avt" className="imageme" src={this.state.myavatar}/> :
                        <img alt="avt" className="imageme" src="https://abs.twimg.com/sticky/default_profile_images/default_profile_bigger.png"/>
                        }
                        <input className="textareatweet" value={this.state.mycomment} onChange={(e) => this.setState({mycomment: e.target.value})}/>
                        <i className="far fa-share-square" style={{marginTop: 30}} onClick={() => this.handlecomment()}/>
                    </div>

                </Modal.Body>
            </Modal>
        );
    }
}
const mapStateToProps = (state) => ( {
    comment:state.appReducer.comment,
    authenticate:state.appReducer.authenticate
})
const mapDispathToProps = (dispatch)=>({

})
export default connect(mapStateToProps,mapDispathToProps) (DetailTweet);