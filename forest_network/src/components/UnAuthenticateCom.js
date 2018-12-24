import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
const UnAuthenticateCom = ({isAuthenticated, component: Component, rest}) => {
    console.log('aaaaa')
    return <Route {...rest} render={(props) => !isAuthenticated ? <Component {...props}/> : <Redirect to={'/'}/>}/>
}

const mapStateToProps = (state) => ({isAuthenticated: state.appReducer.authenticate.isAuthenticated})
export default connect(mapStateToProps)(UnAuthenticateCom);