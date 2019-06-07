import React, {Component} from "react";
import Navbar from 'react-bootstrap/Navbar';
import LoginForm from "./profile_management/LoginForm";
import {Dropdown} from "react-bootstrap";

class NavbarComponent extends Component {
    constructor(props) {
        super(props);
        this.userLoggedIn = false;
        this.state = {userDisplayName: ""};
        this.pages = {EDIT_PROFILE: 1};

        this.logout = this.logout.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.updateDisplayName = this.updateDisplayName.bind(this);
    }

    logout() {
        this.userLoggedIn = false;
        this.setState({userDisplayName: ""});
        this.props.onUserLoginLogout(null);
    }

    updateDisplayName(user) {
        if (user.nickname && user.nickname !== this.state.userDisplayName) {
            this.setState({userDisplayName: user.nickname},() => this.forceUpdate());
        }
        else if (this.state.user !== user.first_name + " " + user.last_name) {
            this.setState({userDisplayName: user.first_name + " " + user.last_name},() => this.forceUpdate());
        }
    }

    handleLogin(user) {
        this.updateDisplayName(user);
        this.userLoggedIn = true;
        this.props.onUserLoginLogout(user);
    }

    render() {
        return (
            <Navbar bg="primary" expand="lg">
                {!this.userLoggedIn ? <LoginForm onLogin={this.handleLogin}/> :
                    <React.Fragment>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Menu
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => this.props.onNewPage(this.pages.EDIT_PROFILE)}>Edit
                                    Profile</Dropdown.Item>
                                <Dropdown.Divider/>
                                <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <b>Hello, {this.state.userDisplayName}!</b>
                    </React.Fragment>}
            </Navbar>
        );
    }
}

export default NavbarComponent;