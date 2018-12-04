import React, {Component} from 'react'
import "./NavBar.css"
import {Button, Form, FormControl, Nav, Navbar, NavItem, Glyphicon, InputGroup, Image} from "react-bootstrap";

class NavBar extends Component {
    render() {
        return (
            <Navbar fixedTop bg="light" expand="lg" collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                </Navbar.Header>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavItem href="#" className="nav-brand">
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
                        <NavItem>
                            <Image circle src="http://via.placeholder.com/35x35"/>
                        </NavItem>
                        <NavItem>
                            <Button bsStyle="info" className="nav-tweet">Tweet</Button>
                        </NavItem>
                    </Nav>
                    <Nav pullRight inline>
                        <Navbar.Form pullRight className="nav-form-input">
                            <InputGroup>
                                <FormControl type="text" placeholder="Search" className="nav-input"/>
                                <InputGroup.Addon className="nav-input">
                                    <Glyphicon glyph="search"/>
                                </InputGroup.Addon>
                            </InputGroup>
                        </Navbar.Form>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavBar;