import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { Container, Card, Row, Col, Dropdown, DropdownButton, Button } from "react-bootstrap";
import EditText from "../EditText/EditText";

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

    function handleNameChange(wishListId, name) {
        API.renameWishlist(props.userEmail, wishListId, name).then(res =>{
            API.getWishLists({ email: props.userEmail }).then(res => {
                setItems(res.data);
            })
        })
        .catch(err =>{
            console.log(err);
        })
    }
    
    function handleNewWishList(id){
        API.addWishList(props.userEmail, id, []).then(res =>{
            API.getWishLists({ email: props.userEmail }).then(res => {
                setItems(res.data);
            })
        })
        .catch(err =>{
            console.log(err);
        })
    }

    function handleWishListDelete(wishListId){
        API.removeWishlist(props.userEmail, wishListId).then(res =>{
            API.getWishLists({ email: props.userEmail }).then(res => {
                setItems(res.data);
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
            <Row className="justify-content-md-center">
                <h1>Wishlists</h1>
            </Row>
            <Row>
                {items.length < 3? <Button onClick={() => handleNewWishList(items.length + 1)}>Add New Wishlist</Button> : null}
                {items.map((item, index) => (
                    <Card key={index}>
                        <Card.Body>
                            <Row className="justify-content-md-center">
                                <EditText text={item.name} handleTextChange={(text) => handleNameChange(item.wishListId, text)}></EditText>
                                <Button variant='danger' onClick={() => handleWishListDelete(item.wishListId)}>Delete</Button>
                            </Row>
                            
                            <Row>
                                {item.books.map((book, index) => (
                                    <Col md={4}>
                                        <Card key={index}>
                                            <Card.Img variant="top" src={book.cover_url} />
                                            <Card.Body>
                                                <Card.Title>{book.title}</Card.Title>
                                                <Card.Text>{book.description}</Card.Text>
                                                <Row className="justify-content-md-center">
                                                <DropdownButton title="Move to WishList">
                                                    <Dropdown.Item as="button" onClick={() => {handleMoveBook(item.wishListId, 1, book)}}>1</Dropdown.Item>
                                                    <Dropdown.Item as="button" onClick={() => {handleMoveBook(item.wishListId, 2, book)}}>2</Dropdown.Item>
                                                    <Dropdown.Item as="button" onClick={() => {handleMoveBook(item.wishListId, 3, book)}}>3</Dropdown.Item>
                                                </DropdownButton>
                                                <Button variant="danger" onClick={()=> handleBookDelete(item.wishListId, book)}>Delete</Button>
                                                </Row>
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