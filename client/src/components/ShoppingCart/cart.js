import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { Container, Card, Row, Col, Dropdown, DropdownButton, Button } from "react-bootstrap";

function cart(props) {
/*
    const [items, setItems] = useState([])

    useEffect(() => {
        API.getCartForUser({ email: props.userEmail }).then(res => {
            setItems(res.data);
        })
            .catch(err => console.log(err));
    }, [])
*/
    return (
        <Container>
            <Row>
                Hello World
            </Row>
        </Container>
    )
}

export default cart;
