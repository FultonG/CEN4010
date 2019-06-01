import React from "react";
//import React, { useState } from "react";
import { Form, Alert, Button, Container } from "react-bootstrap";
import {Grid, Col, Dropdown, DropdownButton} from "react-bootstrap";
import EditNicknameinfo from "../profile_management/EditNicknameinfo";
import EditPersonalInfo from "../profile_management/EditPersonalInfo";
import EditShippingInfo from "../profile_management/EditShippingInfo";
function EditProfileComponent() {
    const months = ["January", "February", "March", "April", "May", "June", 
                    "July", "August", "September", "October", "November", "December"]; 

  
    function handleSubmit(event) {
        // TODO
    }

    function checkLength(event) {
       let inString = event.currentTarget.value
       let inChar = (inString).charCodeAt(inString.length-1)
       
       if (inChar < 48 || inChar > 57) {
           event.currentTarget.value = inString.slice(0, inString.length-1)
       }
       
       if (inString.length > event.currentTarget.maxLength) {
            event.currentTarget.value = inString.slice(0, event.currentTarget.maxLength)
       }

    }

    

    return (
        <React.Fragment>
            <Container style={{ paddingTop: "20px" }}>

                <EditNicknameinfo/>
                <EditPersonalInfo/>
                <EditShippingInfo/>
                <b>Add a credit card</b>
                <Form.Group controlId="EditProfileComponent.creditCardNumber">
                    <Form.Label>Credit Card Number</Form.Label>
                    <Form.Control type="text" maxlength="16" onInput={checkLength}/>
                 </Form.Group>
                 <Form.Label>Expiration Date</Form.Label>
                 <Form.Row controlId="EditProfileComponent.expirationDate">
                     <Form.Group as={Col} md="4">
                        <Form.Control as="select">
                            {months.map((month) => {
                                return <option>{month}</option>;
                             })}                    
                           </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md="4">    
                        <Form.Control type="text" maxlength="4" onInput={checkLength} placeholder="Year"/>
                    </Form.Group>
                 </Form.Row>
                 <Form.Group controlId="EditProfileComponent.CVV">
                    <Form.Label>Security Code</Form.Label>
                    <Form.Control style={{ width: "25%" }} type="text" maxlength="3" onInput={checkLength} placeholder="CVV"/>
                 </Form.Group>
                 <Button type="submit">Add</Button>
            </Container>
        </React.Fragment>
    )
}

export default EditProfileComponent;
