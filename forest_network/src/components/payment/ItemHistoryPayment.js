import React, {Component} from 'react';
import './Payment.css'
import connect from "react-redux/es/connect/connect";

class ItemHistoryPayment extends Component {
    render() {
        const {data} =this.props
        return (
            <div className="contenthistorypayment">
                <div className="contentinput">
                    <text style={{marginRight:5}}>Time</text>
                    <text>{data.time}</text>
                </div>
                <div className="contentinput">
                    <text style={{marginRight:5}}>Type payment:</text>
                    {data.account == this.props.authenticate.publickey ?<text>pay money</text> : <text>receive money</text> }
                </div>
                <div className="contentinput">
                    <text style={{marginRight:5}}>Account payment:</text>
                    <text>{data.params.address}</text>
                </div>
                <div className="contentinput">
                    <text style={{marginRight:5}}>Amount:</text>
                    <text>{data.params.amount}</text>
                </div>
                <div className="linepayment"></div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ( {
    authenticate:state.appReducer.authenticate
})

export default connect(mapStateToProps,null)(ItemHistoryPayment);