import React from "react";
import { Form, Alert, Button, Container } from "react-bootstrap";
import {Grid, Col, Dropdown, DropdownButton} from "react-bootstrap";

function EditProfileComponent() {

    const months = ["January", "February", "March", "April", "May", "June", 
                    "July", "August", "September", "October", "November", "December"]; 

    function handleMonthChange() {
        // TODO    
    }

    return (
        <React.Fragment>
            <Container style={{ paddingTop: "20px" }}>
                <b>Hello Sprint 1!</b>
                <h1>Other Edit Profile Stuff Will Go Here</h1>
                <b> Your credit cards</b>
                <ul>

                </ul>
                <b> Add a credit card</b>
                <Form.Group controlId="EditProfileComponent.creditCardNumber">
                    <Form.Label>Credit Card Number</Form.Label>
                        <Form.Control type="text"/>
                 </Form.Group>
                 <Form.Row controlId="EditProfileComponent.expirationDate">
                     <Form.Group as={Col} md="4">
                        <Form.Control as="select">
                            {months.map((month) => {
                                return <option>{month}</option>;
                             })}                    
                           </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md="4">    
                        <Form.Control type="text" placeholder="Year"/>
                    </Form.Group>
                 </Form.Row>
                 <Form.Group controlId="EditProfileComponent.CVV">
                    <Form.Control type="text" placeholder="CVV"/>
                 </Form.Group>
                 <Button type="submit">Add</Button>
            </Container>
        </React.Fragment>
    )
}

export default EditProfileComponent;
