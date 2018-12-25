import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Button from './Button'
import './login.css'
import {authenticate} from '../../redux/action'

class Login extends Component {
    state = {
        secret: ''
    }
    setValue = (e) => this.setState({secret: e.target.value})
    render() {
        return (
            <div>
                <div className = "form-box" >
                    <div className = "head" > Forest Network </div>
                        <form action="#" id="login-form">
                            <input className="form-control" placeholder="Public Key"/>
                            <input className="form-control" placeholder="Secret Key" onChange={this.setValue}/>
                            <button className="btn-login" onClick={() => this.props.authenticate(this.state.secret)}>LOGIN</button>
                            <p className="text-p">1512649 - 1512658 - ĐACK Công nghệ mới</p>
                        </form>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    authenticate: (secret) => dispatch(authenticate(secret))
})



export default withRouter(connect(null, mapDispatchToProps)(Login));