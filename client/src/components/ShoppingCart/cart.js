import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { Container, Card, Row, Col, Dropdown, DropdownButton, Button } from "react-bootstrap";

function Cart(props) {

    const [items, setItems] = useState([])
    useEffect(() => {
        API.getCartForUser({ email: props.userEmail }).then(res => {
            setItems(res.data);
        })
            .catch(err => console.log(err));
    }, [])

    return (
        <Container>
            <h2>Shopping Cart</h2>
            <Row>
                {items.map((books, index) => (
                    <Card key = {index}>
                        <Card.Img variant="top" src={books.book.cover_url} />
                        <Card.Body>
                            <Card.Title>{books.book.title}</Card.Title>
                            <Card.Text>{books.book.description}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </Row>
        </Container>
    )
}

export default Cart;
