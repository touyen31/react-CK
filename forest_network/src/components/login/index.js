import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Button from './Button'
import {authenticate} from '../../redux/action'
class Login extends Component {
    state = {
        secret: ''
    }
    setValue = (e) => this.setState({secret: e.target.value})
    render() {
        return (
            <div>
                <input placeholder={'public key'}/>
                <input placeholder={'secret'} onChange={this.setValue}/>
                <Button onClick={() => this.props.authenticate(this.state.secret)}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    authenticate: (secret) => dispatch(authenticate(secret))
})



export default withRouter(connect(null, mapDispatchToProps)(Login));