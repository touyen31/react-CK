import React, {Component} from 'react';
import makeTransaction from '../../lib/makeTransaction'
import './Payment.css'
import connect from "react-redux/es/connect/connect";
import {getAllMyStatus} from "../../redux/action";

class Payment extends Component {
    constructor(){
        super()
        this.state={
            amount:'',
            account:''
        }
    }
    handlePostPayment = async ()=>{
        console.log('amount: '+this.state.amount )
        console.log('amount: '+this.state.account )
        let params = {
            address:this.state.account,
            amount:parseInt(this.state.amount, 10)
        }
        try{
            await makeTransaction(this.props.authenticate.publickey, 'payment', params,this.props.authenticate.secretkey)
            alert('thanh cong')
        }
        catch (e) {
            console.log(e)
            alert('loi')
        }
    }


    render() {
        return (
            <div className="content">
                <input placeholder="account" value={this.state.account}  onChange={(e)=>this.setState({account:e.target.value})}/>
                <input placeholder="amount" value={this.state.amount} onChange={(e)=>this.setState({amount:e.target.value})}/>
                <button onClick={()=>this.handlePostPayment()}>Chuyển</button>
            </div>
        );
    }
}
const mapStateToProps = (state) => ( {
    authenticate:state.appReducer.authenticate
})

export default connect(mapStateToProps,null)(Payment);