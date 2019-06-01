import React, { useState } from "react";
import Navbar from 'react-bootstrap/Navbar'
import LoginForm from "./profile_management/LoginForm";
import {Dropdown} from "react-bootstrap";

function NavbarComponent(props) {
    const [name, setName] = useState("");
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const pages = {EDIT_PROFILE: 1};

    function logout() {
        setUserLoggedIn(false);
        setName("");
        props.onLogout(null);
    }

    function setUserName(user) {
        setName(user.firstName + " " + user.lastName);
        setUserLoggedIn(true);
        props.onLoginSuccessful(user);
    }

    return (
        <Navbar bg="primary" expand="lg">
            {!userLoggedIn ? <LoginForm onLogin={setUserName}/> :
                <React.Fragment>
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            Menu
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => props.onNewPage(pages.EDIT_PROFILE)}>Edit Profile</Dropdown.Item>
                            <Dropdown.Divider/>
                            <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <b>Hello, {name}!</b>
                </React.Fragment>}
        </Navbar>
    )
}

export default NavbarComponent;