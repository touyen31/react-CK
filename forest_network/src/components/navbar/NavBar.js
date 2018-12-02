import React, {Component} from 'react'
import "./NavBar.css"
import {Button, Form, FormControl, Nav, Navbar, NavItem} from "react-bootstrap";

class NavBar extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Header>
                    <Navbar.Brand href="/" className="nav-brand">Trang chủ</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                </Navbar.Header>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavItem href="/about" className="nav-brand">Giới thiệu</NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem pullRight href="/login">Đã có tài khoản? Đăng nhập</NavItem>
                    </Nav>
                    <Nav pullRight inline>
                        <Navbar.Form pullRight className="nav-form-input">
                            <Form>
                            <FormControl type="text" placeholder="Search" className="nav-input"/>{' '}
                            <Button variant="outline-success">Search</Button>
                            </Form>
                        </Navbar.Form>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavBar;