import React, { useState } from "react";
import API from "../../utils/API";
import { Form, Alert, Button, Container } from "react-bootstrap";
import {Redirect} from "react-router-dom";

function LoginForm(props) {
    const [loginFailed, setLoginFailed] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    function handleLogin(event) {
        event.preventDefault();
        const credentials = {
            "email": email,
            "password": password
        };
        API.login(credentials)
            .then(res => handleLoginResponse(res, credentials.email))
            .catch(err => handleLoginError(err));
    }

    function handleLoginError(err) {
        if (err.response && err.response.status === 401) {
            setLoginFailed(true);
        } else {
            alert("Login Error - " + err);
        }
    }

    function handleLoginResponse(response, email) {
        localStorage.setItem("auth_token", response.data);
        API.getUser({email: email})
            .then(res => {
                setRedirect(true);
                props.handleAuth(true);
            })
            .catch(err => alert("Login Error - " + err));
    }

    function handlePasswordChange(event) {
        setPassword(event.currentTarget.value);
    }

    function handleEmailChange(event) {
        setEmail(event.currentTarget.value);
    }

    function handleDismiss(){
        setLoginFailed(false);
    }

    return (
        <React.Fragment>
            {redirect? <Redirect to="/editProfile"/>: null}
            <Container style={{ paddingTop: "20px" }}>
                {loginFailed ? <Alert dismissible variant="danger" onClose={handleDismiss}>Incorrect Email or Password</Alert> : null}
                <Form inline onSubmit={e => handleLogin(e)}>
                    <Form.Group controlId="LoginForm.email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="foo@bar.com" value={email} onChange={handleEmailChange} />
                    </Form.Group>
                    <Form.Group controlId="LoginForm.password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={handlePasswordChange} />
                    </Form.Group>
                    <Button type="submit">Login</Button>
                </Form>
            </Container>
        </React.Fragment>
    )
}

export default LoginForm;