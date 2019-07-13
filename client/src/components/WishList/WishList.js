import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { Container, Card, Row, Col, Dropdown, DropdownButton, Button } from "react-bootstrap";

function WishList(props) {
    const [items, setItems] = useState([])

    useEffect(() => {
        API.getWishLists({ email: props.userEmail }).then(res => {
            setItems(res.data);
        })
            .catch(err => console.log(err));
    }, [])

    function handleMoveBook(current, desired, book){
        if(current === desired){
            return;
        }
        API.removeBookFromWishlist(props.userEmail, current, book).then(res => {
            API.addBookToWishList(props.userEmail, desired, book).then(res =>{
                API.getWishLists({ email: props.userEmail }).then(res => {
                    setItems(res.data);
                })
                    .catch(err => console.log(err));
            })
            .catch(err =>{
                console.log(err);
            })
        })
        .catch(err =>{
            console.log(err);
        })
        
    }

    function handleBookDelete(wishListId, book){
        API.removeBookFromWishlist(props.userEmail, wishListId, book).then(res => {
            API.getWishLists({ email: props.userEmail }).then(res => {
                setItems(res.data);
            })
                .catch(err => console.log(err));
        })
        .catch(err =>{
            console.log(err);
        })
    }

    return (
        <Container>
            <Row>
                {items.map((item, index) => (
                    <Card key={index}>
                        <Card.Body>
                            <h2>Wish List #{item.wishListId}</h2>
                            <Row>
                                {item.books.map((book, index) => (
                                    <Col md={4}>
                                        <Card key={index}>
                                            <Card.Img variant="top" src={book.cover_url} />
                                            <Card.Body>
                                                <Card.Title>{book.title}</Card.Title>
                                                <Card.Text>{book.description}</Card.Text>
                                                <Button variant="danger" onClick={()=> handleBookDelete(item.wishListId, book)}>Delete</Button>
                                                <DropdownButton title="Move to WishList">
                                                    <Dropdown.Item as="button" onClick={() => {handleMoveBook(item.wishListId, 1, book)}}>1</Dropdown.Item>
                                                    <Dropdown.Item as="button" onClick={() => {handleMoveBook(item.wishListId, 2, book)}}>2</Dropdown.Item>
                                                    <Dropdown.Item as="button" onClick={() => {handleMoveBook(item.wishListId, 3, book)}}>3</Dropdown.Item>
                                                </DropdownButton>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Card.Body>
                    </Card>
                ))}
            </Row>
        </Container>
    )
}

export default WishList;