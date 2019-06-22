import React, {useState, useEffect} from 'react';
import {Button, Col, Form} from "react-bootstrap";

// Stick to database diagram: https://drive.google.com/file/d/1SsKnQoe0B_wKTRp6rKocK9oaolqMd1OT/view?usp=sharing
function EditCreditCards(props) {
    const [userEmail, setUserEmail] = useState(props.email);
    const [creditCardNumber, setCreditCardNumber] = useState(props.creditCardNumber);
    const [cvv, setCvv] = useState(props.cvv);
    const [expirationMonth, setExpirationMonth] = useState(props.expirationMonth);
    const [expirationYear, setExpirationYear] = useState(props.expirationYear);
    const [formCheck, setFormCheck] = useState(false);
    
    const months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];

    function updateCreditCardNumber(event) {
        setCreditCardNumber(event.target.value);
    }
    
    function updateCvv(event) {
        setCvv(event.target.value);
    }

    function updateExpirationMonth(event) {
        setExpirationMonth(event.target.value);
    }

    function updateExpirationYear(event) {
        setExpirationYear(event.target.value);
    }

    function submitNewCreditCard(event) {
        // TODO
    }

    function checkIfEmpty() {
        if (!creditCardNumber || !expirationYear || !cvv) {
            setFormCheck(false);
        }
        else if (creditCardNumber.length < 1 || expirationYear.length < 1 || cvv.length < 1) {
            setFormCheck(false);
        }
        else {
            setFormCheck(true);
        }
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

    // Ensure that our input fields are not undefined or empty
    useEffect(() => {checkIfEmpty()});
    return(
        <div className="card">
        <div className="card-header">
        <b>Edit Credit Cards</b>
        </div>
        <div className="card-body">
            <Form.Group controlId="EditProfileComponent.creditCardNumber">
                <Form.Label> Credit Card Number</Form.Label>
                <Form.Control type="text" maxLength="16" onInput={checkLength} value={creditCardNumber} onChange={updateCreditCardNumber}/>
            </Form.Group>
            <Form.Label>Expiration Date</Form.Label>
            <Form.Row controlId="EditProfileComponent.expirationDate">
                <Form.Group as={Col} md="4">
                    <Form.Control as="select" value={expirationMonth} onChange={updateExpirationMonth}>
                        {months.map((month) => {
                            return <option>{month}</option>;
                        })}
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Control type="text" maxLength="4" onInput={checkLength} value={expirationYear} onChange={updateExpirationYear} placeholder="Year"/>
                </Form.Group>
            </Form.Row>
            <Form.Group controlId="EditProfileComponent.CVV">
                <Form.Label>Security Code</Form.Label>
                <Form.Control style={{ width: "25%" }} type="text" maxLength="3" onInput={checkLength} value={cvv} onChange={updateCvv} placeholder="CVV"/>
            </Form.Group>
            <Button type="submit" disabled={!formCheck}>Add</Button>
        </div>
    </div>
    );
}

export default EditCreditCards;
