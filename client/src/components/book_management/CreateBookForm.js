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
    const [bookAuthorBio, setAuthorBio] = useState("");

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
            author_bio: bookAuthorBio
        };
        API.createBook(Book)
        .then(() => alert("Book Created!"))
        .catch(err => handleAccountCreationError(err));
        
    }

    function handleAccountCreationError(err) {
        if (err.response && err.response.status === 409) {
            setError(true);
        } else {
            alert("Book creation error: " + err);
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
        setAuthorBio(event.currentTarget.value);
    }
    
    return (
        <div className="card">
        <div className="card-header">
          <p>Add Book</p>
        </div>
            <Container style={{ paddingTop: "20px" }}>
                <Form onSubmit={e => handleSubmit(e)}>
				<Form inline>
                    <Form.Group controlId="CreateBookForm.bookTitle" >
                        <Form.Label >Title &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Form.Label>
                        <Form.Control type="text" value={bookTitle} onChange={handleTittleChange} />
					</Form.Group >&nbsp;&nbsp;&nbsp;
					<Form.Group controlId="CreateBookForm.bookAuthor">
                        <Form.Label>Author&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Form.Label>
                        <Form.Control type="text" value={bookAuthor} onChange={handleAuthorChange} />
                    </Form.Group>&nbsp;&nbsp;&nbsp;
					<Form.Group controlId="CreateBookForm.bookGenre">
                        <Form.Label>Genre&nbsp;</Form.Label>
                        <Form.Control type="text" value={bookGenre} onChange={handleGenreChange} />
                    </Form.Group>&nbsp;&nbsp;&nbsp;
				</Form>
				<Form>
					&nbsp;
					&nbsp;
				</Form>
				<Form inline>
				<Form.Group controlId="CreateBookForm.bookPublisher">
                        <Form.Label>Publisher&nbsp;</Form.Label>
                        <Form.Control type="text" value={bookPublisher} onChange={handlePublisherChange} />
                    </Form.Group>&nbsp;&nbsp;&nbsp;
                    <Form.Group controlId="CreateBookForm.bookPublish_date">
                        <Form.Label>Publisher date&nbsp;</Form.Label>
                        <Form.Control type="text" value={bookPublish_date} onChange={handlePublisherDateChange} />
                    </Form.Group>&nbsp;&nbsp;&nbsp;
					<Form.Group controlId="CreateBookForm.bookPrice">
                        <Form.Label>Price&nbsp;&nbsp;&nbsp;</Form.Label>
                        <Form.Control type="text" value={bookPrice} onChange={handlePriceChange} />
                    </Form.Group>&nbsp;&nbsp;&nbsp;
				</Form>
				    <Form>
						&nbsp;
						&nbsp;
					</Form>
					<Form.Group controlId="CreateBookForm.bookCover_url">
                        <Form.Label>Cover url</Form.Label>
                        <Form.Control type="text" value={bookCover_url} onChange={handleCoverURLChange} />
                    </Form.Group>
                    <Form.Group controlId="CreateBookForm.bookDescription">
                        <Form.Label>Description</Form.Label>
                        <textarea class="form-control" value={bookDescription} onChange={handleDescriptionChange}  rows="3"></textarea>
                    </Form.Group>
                    <Form.Group controlId="CreateBookForm.bookAuthorBio">
                        <Form.Label>Author biography</Form.Label>
                        <textarea class="form-control" value={bookAuthorBio} onChange={handleAuthorBioChange} rows="3"></textarea>
                    </Form.Group>
                    <Button type="submit" >Add</Button>
                </Form>
            </Container>
        </div>
    )
}
export default CreateBookForm;