import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'

class Button extends Component {
    render() {
        return (
            <button onClick={this.props.onClick}>
                Login
            </button>
        );
    }
}

export default withRouter(Button);