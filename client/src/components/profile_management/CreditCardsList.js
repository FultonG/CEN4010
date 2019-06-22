import React, {useState, useEffect} from "react";
import {Card, Button, Container, ListGroup, ButtonGroup, Form} from "react-bootstrap";
import {Button, Col, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import API from "../../utils/API";

function CreditCardsList(props) {
    const [userEmail]  = useState(props.email);
    const [trueCreditCards, setTrueCreditCards] = useState([]);
    const [creditCards, setCreditCards] = useState([]);
    const [creditCardNumber, setCreditCardNumber] = useState("");
    const [CVV, setCVV] = useState("");
    const [expirationMonth, setExpirationMonth] = useState("January");
    const [expirationYear, setExpirationYear] = useState("");
    const [formCheck, setFormCheck] = useState(false);

    useEffect(() => {
        updateTrueCreditCards();
    }, []);

    useEffect(() => {checkIfEmpty()});

    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

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

    function checkIfEmpty() {
        if (!creditCardNumber || !expirationYear || !CVV) {
            setFormCheck(false);
        }
        else if (creditCardNumber.length < 1 || expirationYear.length < 1 || cvv.length < 1) {
            setFormCheck(false);
        }
        else {
            setFormCheck(true);
        }
    }

    function updateTrueCreditCards() {
        API.getCreditCardsByUser({email: userEmail})
            .then(res => {
                setTrueCreditCards(res.data);
                setCreditCards(res.data);
            })
            .catch(err => console.log(err));
    }

    function updateCreditCardNumber(event) {
        setCreditCardNumber(event.target.value);
    }

    function updateCVV(event) {
        setCVV(event.target.value);
    }

    function updateExpirationMonth(event) {
        setExpirationMonth(event.target.value);
    }

    function updateExpirationYear(event) {
        setExpirationYear(event.target.value);
    }

    function handleEditCreditCardExpMonth(month, index) {
        let newCreditCard = creditCards[index];
        newCreditCard.expiration_month = month;

        let newCreditCards = creditCards;
        newCreditCards[index] = newCreditCard;
        setCreditCards(newCreditCards);
    }

    function handleEditCreditCardExpYear(year, index) {
        let newCreditCard = creditCards[index];
        newCreditCard.expiration_year = year;

        let newCreditCards = creditCards;
        newCreditCards[index] = newCreditCard;
        setCreditCards(newCreditCards);
    }

    function handleEditCreditCardCVV(cvv, index) {
        let newCreditCard = creditCards[index];
        newCreditCard.cvv = cvv;

        let newCreditCards = creditCards;
        newCreditCards[index] = newCreditCard;
        setCreditCards(newCreditCards);
    }

    function handleEditCreditCardCCN(ccn, index) {
        let newCreditCard = creditCards[index];
        newCreditCard.credit_card_num = ccn;

        let newCreditCards = creditCards;
        newCreditCards[index] = newCreditCard;
        setCreditCards(newCreditCards);
    }

    function handleDelete(index) {
        API.deleteCreditCard(creditCards[index]).then(() =>{
            updateTrueCreditCards();
        }).catch(err => console.log(err));
    }

    function handleEdit(index) {
        const creditCardUpdate = {
            primaryKeys: {email: userEmail, credit_card_num: trueCreditCards[index].credit_card_num},
            updates: {$set: {"credit_card_num": creditCards[index].credit_card_num,
                    "cvv": creditCards[index].cvv,
                    "expiration_year": creditCards[index].expiration_year,
                    "expiration_month": creditCards[index].expiration_month}}};
        API.updateCreditCard(creditCardUpdate).then(() => {
            updateTrueCreditCards();
            alert("Shipping Address updated!");
        }).catch(err => {console.log("Error updating shipping address: " + err)})
    }

    function handleAdd(event) {
        event.preventDefault();
        API.addCreditCard({ email: userEmail,
            credit_card_num: creditCardNumber,
            expiration_month: expirationMonth,
            expiration_year: expirationYear,
            cvv: CVV })
            .then(() => {
                updateTrueCreditCards();
                setCreditCardNumber("");
                setCVV("");
                setExpirationMonth("");
                setExpirationYear("");
                // window.location.reload();
            })
            .catch(err => console.log(err));
    }

    return (
        <React.Fragment>
            <Card>
                {creditCards.map((creditCard, index) => (
                    <ListGroup key={index}>
                        <ListGroup.Item key={index}>
                            <Form.Group controlId="EditProfileComponent.creditCardNumber">
                                <Form.Label> Credit Card Number</Form.Label>
                                <Form.Control type="text" maxLength="16" onInput={checkLength} placeholder={creditCard.credit_card_num} onChange={(event) => {handleEditCreditCardCCN(event.target.value, index)}}/>
                            </Form.Group>
                            <Form.Label>Expiration Date</Form.Label>
                            <Form.Row controlId="EditProfileComponent.expirationDate">
                                <Form.Group as={Col} md="4">
                                    <Form.Control as="select" placeholder={creditCard.expiration_month} onChange={(event) => {handleEditCreditCardExpMonth(event.target.value, index)}}>
                                        {months.map((month) => {
                                            return <option>{month}</option>;
                                        })}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Control type="text" maxLength="4" onInput={checkLength} placeholder={creditCard.expiration_year} onChange={(event) => {handleEditCreditCardExpYear(event.target.value, index)}}/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Group controlId="EditProfileComponent.CVV">
                                <Form.Label>Security Code</Form.Label>
                                <Form.Control style={{ width: "25%" }} type="text" maxLength="3" onInput={checkLength}  onChange={(event) => {handleEditCreditCardCVV(event.target.value, index)}} placeholder={creditCard.cvv}/>
                            </Form.Group>
                            <ButtonGroup className="float-right">
                                <Button onClick={() => handleEdit(index)}>Save Edit</Button>
                                <Button onClick={() => handleDelete(index)} variant="danger">Delete</Button>
                            </ButtonGroup>
                        </ListGroup.Item>
                    </ListGroup>
                ))}
            </Card>
            <Form onSubmit={handleAdd}>
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
                    <Form.Control style={{ width: "25%" }} type="text" maxLength="3" onInput={checkLength} value={CVV} onChange={updateCVV} placeholder="CVV"/>
                </Form.Group>
                <Button type="submit" disabled={!formCheck}>Add</Button>
            </Form>
        </React.Fragment>
    )
}
export default CreditCardsList;