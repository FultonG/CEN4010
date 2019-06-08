import React, { Component } from 'react';
import {Button, Col, Form} from "react-bootstrap";

// Stick to database diagram: https://drive.google.com/file/d/1SsKnQoe0B_wKTRp6rKocK9oaolqMd1OT/view?usp=sharing
class EditCreditCards extends Component {
    constructor(props){
        super(props);

        this.months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        this.checkLength = this.checkLength.bind(this);
    }

    checkLength(event) {
        let inString = event.currentTarget.value;
        let inChar = (inString).charCodeAt(inString.length-1);

        if (inChar < 48 || inChar > 57) {
            event.currentTarget.value = inString.slice(0, inString.length-1);
        }

        if (inString.length > event.currentTarget.maxLength) {
            event.currentTarget.value = inString.slice(0, event.currentTarget.maxLength);
        }
    }

    render() {
        return(
            <div className="card">
            <div className="card-header">
            <b>Edit Credit Cards</b>
            </div>
            <div className="card-body">
                <Form.Group controlId="EditProfileComponent.creditCardNumber">
                    <Form.Label> Credit Card Number</Form.Label>
                    <Form.Control type="text" maxLength="16" onInput={this.checkLength}/>
                </Form.Group>
                <Form.Label>Expiration Date</Form.Label>
                <Form.Row controlId="EditProfileComponent.expirationDate">
                    <Form.Group as={Col} md="4">
                        <Form.Control as="select">
                            {this.months.map((month) => {
                                return <option>{month}</option>;
                            })}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                        <Form.Control type="text" maxLength="4" onInput={this.checkLength} placeholder="Year"/>
                    </Form.Group>
                </Form.Row>
                <Form.Group controlId="EditProfileComponent.CVV">
                    <Form.Label>Security Code</Form.Label>
                    <Form.Control style={{ width: "25%" }} type="text" maxLength="3" onInput={this.checkLength} placeholder="CVV"/>
                </Form.Group>
                <Button type="submit">Add</Button>
            </div>
        </div>
        );
    }
}

export default EditCreditCards;
