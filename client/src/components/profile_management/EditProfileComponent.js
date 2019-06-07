import React, {useState, useRef, useEffect} from "react";
import { Form, Button, Container } from "react-bootstrap";
import {Grid, Col} from "react-bootstrap";
import EditNicknameInfo from "./EditNicknameInfo";
import EditPersonalInfo from "./EditPersonalInfo";
import EditShippingInfo from "./EditShippingInfo";

/**
 Helpful resourceS:
 https://stackoverflow.com/questions/53351517/react-hooks-skip-first-run-in-useeffect
 https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
 */

function EditProfileComponent(props) {
    const [nickname, setNickname] = useState(props.userDetails.nickname);
    const [email, setEmail] = useState(props.userDetails.email);
    const [firstName, setFirstName] = useState(props.userDetails.first_name);
    const [lastName, setLastName] = useState(props.userDetails.last_name);

    const months = ["January", "February", "March", "April", "May", "June", 
                    "July", "August", "September", "October", "November", "December"];

    const isFirstRunNickname = useRef(true);
    useEffect(() => {
        if (isFirstRunNickname.current) {
            isFirstRunNickname.current = false;
            return;
        }

        props.onNameUpdate(getUserDetails());
    }, [nickname]); // Only re-run the effect if nickname changes
    
    const personalInfoFieldUpdatedCount = useState(0);
    useEffect(() => {
        if (personalInfoFieldUpdatedCount.current) {
            personalInfoFieldUpdatedCount.current = false;
            return;
        }

        props.onNameUpdate(getUserDetails());
    }, [nickname]); // Only re-run the effect if nickname changes

    function getUserDetails() {
        return {
            nickname: nickname,
            email: email,
            first_name: firstName,
            last_name: lastName
        };
    }

    function checkLength(event) {
       let inString = event.currentTarget.value;
       let inChar = (inString).charCodeAt(inString.length-1);
       
       if (inChar < 48 || inChar > 57) {
           event.currentTarget.value = inString.slice(0, inString.length-1);
       }
       
       if (inString.length > event.currentTarget.maxLength) {
            event.currentTarget.value = inString.slice(0, event.currentTarget.maxLength);
       }
    }

    return (
        <React.Fragment>
            <Container style={{ paddingTop: "20px" }}>
                <EditNicknameInfo nickname={nickname} email={email} onNicknameUpdate={setNickname}/>
                <EditPersonalInfo first_name={firstName} last_name={lastName} email={email} onFirstNameUpdate={setFirstName} onLastNameUpdate={setLastName}/>
                <EditShippingInfo/>
                <b>Add a credit card</b>
                <Form.Group controlId="EditProfileComponent.creditCardNumber">
                    <Form.Label>Credit Card Number</Form.Label>
                    <Form.Control type="text" maxLength="16" onInput={checkLength}/>
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
                        <Form.Control type="text" maxLength="4" onInput={checkLength} placeholder="Year"/>
                    </Form.Group>
                 </Form.Row>
                 <Form.Group controlId="EditProfileComponent.CVV">
                    <Form.Label>Security Code</Form.Label>
                    <Form.Control style={{ width: "25%" }} type="text" maxLength="3" onInput={checkLength} placeholder="CVV"/>
                 </Form.Group>
                 <Button type="submit">Add</Button>
            </Container>
        </React.Fragment>
    )
}

export default EditProfileComponent;
