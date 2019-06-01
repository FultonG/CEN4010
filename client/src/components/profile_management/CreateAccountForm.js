import React, { useState } from "react";
import API from "../../utils/API";
import { Form, Alert, Button, Container } from "react-bootstrap";

function CreateAccountForm() {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        const user = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password,
            "homeAddress": null,
            "nickname": null
        }
        API.createAccount(user)
        .then(res => alert("Account Created!"))
        .catch(err => handleAccountCreationError(err));
    }

    function handleAccountCreationError(err) {
        if (err.response && err.response.status === 409) {
            setError(true);
        } else {
            alert("Account creation error - " + err);
        }
    }

    function handlePasswordChange(event) {
        setPassword(event.currentTarget.value);
    }
    
    function handleEmailChange(event) {
        setEmail(event.currentTarget.value);
    }

    function handleFirstNameChange(event) {
        setFirstName(event.currentTarget.value);
    }

    function handleLastNameChange(event) {
        setLastName(event.currentTarget.value);
    }

    function handleDismiss(){
        setError(false);
    }

    return (
        <React.Fragment>
            <Container style={{ paddingTop: "20px" }}>
                {error ? <Alert dismissible variant="danger" onClose={handleDismiss}>There already exists a user with that email address!</Alert> : null}
                <Form onSubmit={e => handleSubmit(e)}>
                    <Form.Group controlId="CreateAccountForm.firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" value={firstName} onChange={handleFirstNameChange} />
                    </Form.Group>
                    <Form.Group controlId="CreateAccountForm.lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" value={lastName} onChange={handleLastNameChange} />
                    </Form.Group>
                    <Form.Group controlId="CreateAccountForm.email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="foo@bar.com" value={email} onChange={handleEmailChange} />
                    </Form.Group>
                    <Form.Group controlId="CreateAccountForm.password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={handlePasswordChange} />
                    </Form.Group>
                    <Button type="submit">Register</Button>
                </Form>
            </Container>
        </React.Fragment>
    )
}

export default CreateAccountForm;