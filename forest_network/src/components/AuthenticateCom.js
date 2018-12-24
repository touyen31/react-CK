import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
const AuthenticateCom = ({isAuthenticated, component: Component, rest}) => {
    console.log('auth')
    return <Route {...rest} render={(props) => isAuthenticated ? <Component {...props}/> : <Redirect to={'/login'}/>}/>
}

const mapStateToProps = (state) => ({isAuthenticated: state.appReducer.authenticate.isAuthenticated})
export default connect(mapStateToProps)(AuthenticateCom);