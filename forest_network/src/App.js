import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './components/login'
import Home from './components/home'
import AuthenticateCom from './components/AuthenticateCom'
import UnAuthenticateCom from './components/UnAuthenticateCom'
class App extends Component {
    render() {
    return (
        <BrowserRouter>
            <Switch>
                <UnAuthenticateCom exact path={'/login'} component={Login}/>
                <AuthenticateCom path='/' component={Home}/>
            </Switch>


        </BrowserRouter>

    );
  }
}

export default App;
