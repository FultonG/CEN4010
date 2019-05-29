import React, { useState } from "react";
import API from "../utils/API";
import { Form, Alert, Button, Container } from "react-bootstrap";

function LoginForm() {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        const credentials = {
            "email": email,
            "password": password
        }
        API.login(credentials)
        .then(res => localStorage.setItem("auth_token", res.data))
        .catch(err => setError(true));
    }

    function handlePasswordChange(event) {
        setPassword(event.currentTarget.value);
    }
    
    function handleEmailChange(event) {
        setEmail(event.currentTarget.value);
    }

    function handleDismiss(){
        setError(false);
    }

    return (
        <React.Fragment>
            <Container style={{ paddingTop: "20px" }}>
                {error ? <Alert dismissible variant="danger" onClose={handleDismiss}>Incorrect Email or Password</Alert> : null}
                <Form onSubmit={e => handleSubmit(e)}>
                    <Form.Group controlId="LoginForm.email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="foo@bar.com" value={email} onChange={handleEmailChange} />
                    </Form.Group>
                    <Form.Group controlId="LoginForm.password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={handlePasswordChange} />
                    </Form.Group>
                    <Button type="submit">Submit form</Button>
                </Form>
            </Container>
        </React.Fragment>
    )
}

export default LoginForm;