import React, {Component} from 'react';
import makeTransaction from '../../lib/makeTransaction'
import './Payment.css'
import connect from "react-redux/es/connect/connect";
import  {getinfo} from '../../redux/action'
import ItemHistoryPayment from "./ItemHistoryPayment";

class Payment extends Component {
    constructor(){
        super()
        this.state={
            amount:'',
            account:'',
            dataStatus:[],
            datapayment:[]
        }
    }
    componentDidMount = async ()=>{
        let data= await getinfo(this.props.authenticate.publickey)
        this.setState({dataStatus: data})
        this.handlefindpayment()
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
            this.setState({amount:'', account:''})
            alert('thanh cong')
        }
        catch (e) {
            console.log(e)
            alert('loi')
        }
    }
    handlefindpayment(){
        console.log(this.state.dataStatus)
        this.state.dataStatus.map((item)=>(
            item.operation == 'payment' && this.setState({datapayment:[...this.state.datapayment, item]})
        ))
        console.log(this.state.datapayment)
    }


    render() {
        return (
            <div className="contentpayment">
                <div className="textname" style={{marginBottom:10}}>payment</div>
                <div className="contentinput">
                    <text style={{marginRight:5}}>Account payment:</text>
                    <input style={{height:40, width:400}} placeholder="account" value={this.state.account}  onChange={(e)=>this.setState({account:e.target.value})}/>
                </div>
                <div className="contentinput">
                    <text style={{marginRight:5}}>Amount:</text>
                    <input style={{height:40, width:400}} placeholder="amount" value={this.state.amount} onChange={(e)=>this.setState({amount:e.target.value})}/>
                </div>
                <button className="btnconfirm" onClick={()=>this.handlePostPayment()}>Chuyển</button>
                <div className="textname" style={{marginTop:10, marginBottom:10}}>historypayment</div>
                {this.state.datapayment.map((item)=><ItemHistoryPayment data={item}/>)}
            </div>
        );
    }
}
const mapStateToProps = (state) => ( {
    authenticate:state.appReducer.authenticate
})

export default connect(mapStateToProps,null)(Payment);