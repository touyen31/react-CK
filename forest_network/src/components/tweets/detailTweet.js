import React, {Component} from 'react';
import './detailTweet.css'
import ItemTweet from "./ItemTweet";
import connect from "react-redux/es/connect/connect";

class DetailTweet extends Component {
    render() {
        return (
            <div>
                <div className="information">
                    <img alt="avt" className="imageme" src="https://i.ytimg.com/vi/SVbnYMMCZbM/hqdefault.jpg"/>
                    <div>
                        <div className="user">Tố Uyên</div>
                        <div className="account">@banhcom</div>

                    </div>
                </div>
                <div className="contaner">
                    <div style={{marginLeft:20}}>hello</div>
                    <div style={{marginLeft:20}}>8:17 - 03/12/2018</div>
                </div>
                <div className="line"></div>
                <div className="behavior">
                    <i className="far fa-comment"></i>
                    <div className="text">10</div>
                    <i className="fas fa-retweet"></i>
                    <div className="text">1</div>
                    <i className="far fa-heart"></i>
                    <div className="text">10</div>
                </div>
                <div className="line"></div>
                <div className="posttweet">
                    <img alt="avt" className="imageme" src="https://i.ytimg.com/vi/SVbnYMMCZbM/hqdefault.jpg"/>
                    <input className="textareatweet"></input>
                </div>
                {this.props.comment.map((item)=><ItemTweet item={item}/>)}
            </div>
        );
    }
}
const mapStateToProps = (state) => ( {
    comment:state.appReducer.comment
})
const mapDispathToProps = (dispatch)=>({

})
export default connect(mapStateToProps,mapDispathToProps) (DetailTweet);