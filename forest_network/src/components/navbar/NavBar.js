import React, {Component} from 'react'
import "./NavBar.css"
import {Button, Form, FormControl, Nav, Navbar, NavItem, Glyphicon, InputGroup, Image} from "react-bootstrap";
import {withRouter} from 'react-router-dom'

import connect from "react-redux/es/connect/connect";
import {getAvatar, unauthenticate} from "../../redux/action";

class NavBar extends Component {
    constructor() {
        super()
        this.state = {
            avatar: null
        }
    }

    componentDidMount = async () => {
        let publicKey = this.props.authenticate.publickey
        let avatar = await getAvatar(publicKey)
        this.setState({avatar})
    }

    handleSignOut=()=>{
        this.props.unauthenticate()
       // this.props.history.push('/login')
    }

    render() {
        return (
            <Navbar fixedTop bg="light" expand="lg" collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                </Navbar.Header>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavItem className="nav-brand" onClick={() => this.props.history.push('/')}>
                            <Glyphicon glyph="home"/> Home
                        </NavItem>
                        <NavItem href="#" className="nav-brand">
                            <Glyphicon glyph="bell"/> Notifications
                        </NavItem>
                        <NavItem href="#" className="nav-brand">
                            <Glyphicon glyph="envelope"/> Messages
                        </NavItem>
                    </Nav>
                    <Nav pullRight className="nav-item">
                        <NavItem onClick={() => this.props.history.push(`/info/${this.props.authenticate.publickey}`)}>
                            {this.state.avatar ?
                                <Image circle className="nav-avt" src={this.state.avatar}/>
                                : <Image circle className="nav-avt" src={"https://abs.twimg.com/sticky/default_profile_images/default_profile_bigger.png"}/>
                            }
                        </NavItem>
                        <NavItem>
                            <Button bsStyle="info" className="nav-tweet" onClick={()=>this.handleSignOut()}>Sign out</Button>
                        </NavItem>
                    </Nav>
                    <Nav pullRight inline>
                        <Navbar.Form pullRight className="nav-form-input">
                            <FormControl type="text" placeholder="     Search" className="nav-input"/>
                        </Navbar.Form>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = (state) => ({
    authenticate: state.appReducer.authenticate
})
const mapDispathToProps = (dispatch)=>({


    unauthenticate:()=>dispatch(unauthenticate())

})

export default withRouter(connect(mapStateToProps, mapDispathToProps)(NavBar));