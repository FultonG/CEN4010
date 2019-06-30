import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import {Container, Card, Row, Col} from "react-bootstrap";

function WishList(props) {
    const [items, setItems] = useState([])

    useEffect(() => {
        API.getWishLists({ email: props.userEmail }).then(res => {
            setItems(res.data);
        })
            .catch(err => console.log(err));
    }, [])

    return (
        <Container>
            <Row>
                {items.map((item, index) => (
                    <Card key={index} clas>
                        <Card.Body>
                            <h2>Wish List #{item.wishListId}</h2>
                            {item.books.map((book, index) => (
                                <Col xs={4}>
                                <Card key={index}>
                                    <Card.Img variant="top" src={book.cover_url} />
                                    <Card.Body>
                                        <Card.Title>{book.title}</Card.Title>
                                        <Card.Text>{book.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                                </Col>
                            ))}
                        </Card.Body>
                    </Card>
                ))}
            </Row>
        </Container>
    )
}

export default WishList;