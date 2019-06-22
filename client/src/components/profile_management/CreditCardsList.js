import React, {useState, useEffect} from "react";
import {Card, Button, Container, ListGroup, ButtonGroup, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import API from "../../utils/API";

function CreditCardsList(props) {
    const [trueCreditCards, setTrueCreditCards] = useState([]);
    const [creditCards, setCreditCards] = useState([]);
    const [userEmail]  = useState(props.email);
    const [creditCardNumber, setCreditCardNumber] = useState(props.creditCardNumber);
    const [cvv, setCvv] = useState(props.cvv);
    const [expirationMonth, setExpirationMonth] = useState(props.expirationMonth);
    const [expirationYear, setExpirationYear] = useState(props.expirationYear);


    useEffect(() => {
        updateTrueCreditCards();
    }, []);

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

    function updateCvv(event) {
        setCvv(event.target.value);
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
            cvv: cvv })
            .then(() => {
                updateTrueCreditCards();
                setCreditCardNumber("");
                setCvv("");
                setExpirationMonth("");
                setExpirationYear("");
                // window.location.reload();
            })
            .catch(err => console.log(err));
    }

    return (
        <React.Fragment>
            <Card>
                {addresses.map((address, index) => (
                    <ListGroup key={index}>
                        <ListGroup.Item key={index}>
                            <input type="text" placeholder={address.address} onChange={(event) => {updateAddress(event.target.value, index)}}/>
                            <ButtonGroup className="float-right">
                                <Button onClick={() => handleEdit(index)}>Save Edit</Button>
                                <Button onClick={() => handleDelete(index)} variant="danger">Delete</Button>
                            </ButtonGroup>
                        </ListGroup.Item>
                    </ListGroup>
                ))}
            </Card>
            <Form onSubmit={handleAdd}>
                <Form.Group>
                    <Form.Label>Address:</Form.Label>
                    <Form.Control placeholder="1234 Main St" value={newAddress} onChange={handleAddressChange} />
                </Form.Group>
                <Button className="float-right" type="submit" variant="primary">Save Changes</Button>
            </Form>
        </React.Fragment>
    )
}
export default CreditCardsList;