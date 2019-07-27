import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { Container, Card, Row, Col, Dropdown, DropdownButton, Button } from "react-bootstrap";

function Cart(props) {

    const [items, setItems] = useState([])
    useEffect(() => {
        API.getCartForUser({ email: props.userEmail }).then(res => {
            setItems(res.data);
            console.log(res.data);
        })
            .catch(err => console.log(err));
    }, [])

    return (
        <Container>
            <h2>Shopping Cart</h2>
            {items.length === 0? 
            <Row className="justify-content-md-center">
                <h4>Your Cart is Empty!</h4>
            </Row>: null}
            <Row>
                {items.map((books, index) => (
                     <Col md={4}>
                        <Card key = {index}>
                            <Card.Img variant="top" src={books.book.cover_url} />
                            <Card.Body>
                                <Card.Title>{books.book.title}</Card.Title>
                                <Card.Text>{books.book.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Cart;
