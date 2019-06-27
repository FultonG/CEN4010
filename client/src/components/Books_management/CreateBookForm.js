import React, { useState } from "react";
import API from "../../utils/API";
import { Form, Alert, Button, Container } from "react-bootstrap";


function CreateBookForm() {
    const [error, setError] = useState(false);
    const [bookTitle, setTitle] = useState("");
    const [bookDescription, setDescription] = useState("");
    const [bookGenre, setGenre] = useState("");
    const [bookPublisher, setPublisher] = useState("");
    const [bookPublish_date, setPublish_date] = useState("");
    const [bookPrice, setPrice] = useState("");
    const [bookCover_url, setCover_url] = useState("");
    const [bookAuthor, setAuthor] = useState("");
    const [bookAutor_bio, setAutor_bio] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        const Book = {
            title: bookTitle,
            description: bookDescription,
            genre: bookGenre,
            publisher: bookPublisher, 
            publish_date: bookPublish_date,
            price: bookPrice,
            cover_url: bookCover_url,
            author: bookAuthor,
            autor_bio: bookAutor_bio
        };
        API.createBook(Book)
        .then(res => alert("Book Created!"))
        .catch(err => handleAccountCreationError(err));
    }

    function handleAccountCreationError(err) {
        if (err.response && err.response.status === 409) {
            setError(true);
        } else {
            alert("Book creation error!!!... - " + err);
        }
    }
        
    function handleTittleChange(event) {
        setTitle(event.currentTarget.value);
    }
    
    function handleDescriptionChange(event) {
        setDescription(event.currentTarget.value);
    }

    function handleGenreChange(event) {
        setGenre(event.currentTarget.value);
    }

    function handlePublisherChange(event) {
        setPublisher(event.currentTarget.value);
    }

    function handlePublisherDateChange(event) {
        setPublish_date(event.currentTarget.value);
    }

    function handlePriceChange(event) {
        setPrice(event.currentTarget.value);
    }

    function handleCoverURLChange(event) {
        setCover_url(event.currentTarget.value);
    }

    function handleAuthorChange(event) {
        setAuthor(event.currentTarget.value);
    }

    function handleAuthorBioChange(event) {
        setAutor_bio(event.currentTarget.value);
    }

    function handleDismiss(){
        setError(false);
    }

    return (
        <div className="card">
        <div className="card-header">
          <b>Create Book</b>
        </div>
            <Container style={{ paddingTop: "20px" }}>
                {error ? <Alert dismissible variant="danger" onClose={handleDismiss}>There already exists a Book with that id!</Alert> : null}
                <Form onSubmit={e => handleSubmit(e)}>
                    <Form.Group controlId="CreateAccountForm.bookTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={bookTitle} onChange={handleTittleChange} />
                    </Form.Group>
                    <Form.Group controlId="CreateAccountForm.bookDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" value={bookDescription} onChange={handleDescriptionChange} />
                    </Form.Group>
                    <Form.Group controlId="CreateAccountForm.bookGenre">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control type="text" value={bookGenre} onChange={handleGenreChange} />
                    </Form.Group>
                    <Form.Group controlId="CreateAccountForm.bookPublisher">
                        <Form.Label>Publisher</Form.Label>
                        <Form.Control type="text" value={bookPublisher} onChange={handlePublisherChange} />
                    </Form.Group>
                    <Form.Group controlId="CreateAccountForm.bookPublish_date">
                        <Form.Label>Publisher date</Form.Label>
                        <Form.Control type="text" value={bookPublish_date} onChange={handlePublisherDateChange} />
                    </Form.Group>
                    <Form.Group controlId="CreateAccountForm.bookPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" value={bookPrice} onChange={handlePriceChange} />
                    </Form.Group>
                    <Form.Group controlId="CreateAccountForm.bookCover_url">
                        <Form.Label>Cover url</Form.Label>
                        <Form.Control type="text" value={bookCover_url} onChange={handleCoverURLChange} />
                    </Form.Group>
                    <Form.Group controlId="CreateAccountForm.bookAuthor">
                        <Form.Label>Author</Form.Label>
                        <Form.Control type="text" value={bookAuthor} onChange={handleAuthorChange} />
                    </Form.Group>
                    <Form.Group controlId="CreateAccountForm.bookAutor_bio">
                        <Form.Label>Author biography</Form.Label>
                        <Form.Control type="text" value={bookAutor_bio} onChange={handleAuthorBioChange} />
                    </Form.Group>
                    <Button type="submit">Register</Button>
                </Form>
            </Container>
        </div>
    )
}

export default CreateBookForm;