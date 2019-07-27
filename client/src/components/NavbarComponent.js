import React, { Component, useState, useEffect } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import LoginForm from "./profile_management/LoginForm";
import { Dropdown } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import AuthService from "../utils/AuthService"
import API from "../utils/API";

const NavbarComponent = (props) => {
    const [redirect, setRedirect] = useState(false);
    const [authenticated, setAuthenticated] = useState(AuthService.isAuthenticated());

    function logout(){
        localStorage.removeItem("auth_token");
        setAuthenticated(false);
        setRedirect(true);
    }
   
    return (
        <Navbar bg="primary" expand="lg">
            {redirect? <Redirect to="/register"/>: null}
            {!authenticated ? <LoginForm handleAuth={setAuthenticated}/> :
            <React.Fragment>
                <Nav className="mr-auto">
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            Menu
                            </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to="/editProfile">Edit Profile</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item as={Link} to="/CreateBookForm">Add Book</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item as={Link} to="/BookDetailsForm">Books Details</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item as={Link} to="/Wishlist">Wishlist</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </Nav>
                    <Nav className="mr-auto">
                    <b>Hello! {AuthService.getProfile().username}</b>
                    </Nav>
                    <Nav className="mr-2">
                    {props.wishList.length > 0 ? <Link to="/WishList"><Button variant="light">Recently Added to Wishlist ({props.wishList.length})</Button></Link> : null}
                </Nav>
                </React.Fragment>}
        </Navbar>
    );
};

export default NavbarComponent;
