/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Link, Route, Switch,  } from 'react-router-dom';
import './Book.css';
import {Card, Col, Button, ListGroup, ButtonGroup, Form} from "react-bootstrap";
import StarRatingComponent from 'react-star-rating-component';
import ModalImage from "react-modal-image";
import API from "../../utils/API";

function BookDetailsForm(props) {
    const [email] = useState(props.userEmail);
    const [truebooks, setTrueBooks] = useState([]);
    const [books, setBooks] = useState([]);
    const [bookAuthor]  = useState(props.author);
    const [bookID]  = useState(props.book_id);
    const [ifPurchased, setIfPurchased] = useState(false);

    useEffect(() => {
        updatetruebooks();
    }, []);

    function updatetruebooks() {
        API.getAllBooks()
        .then(res => {
            console.log(res.data);
            setTrueBooks(res.data);
            setBooks(res.data);
        })
        .catch(err => console.log(err));
    }

        return (
          <React.Fragment>
            {books.map((books, index) => (
                <ListGroup key={index}>
                    <ListGroup.Item key={index}>
                        <div className="card">
                           <div className="book">
                              <div >
                                <div className="description">
                                    <section>
                                      <div align="center">
                                        <ModalImage
                                            small={books.cover_url}
                                            medium={books.cover_url}
                                            hideZoom={true}
                                            alt={books.title}
                                        />
                                      </div>
                                    </section>
                                    <section>
                                        <div className="book-info">
                                          <h3> {books.title} </h3>
                                          <Link to={{pathname: '/BooksByAuthor', state: { bookAuthor: books.author}}}>&nbsp;&nbsp;&nbsp;&nbsp;By {books.author}</Link>
                                          <p> <strong>Publisher:</strong> {books.publisher} </p>
                                          <p> <strong>Price:</strong> {books.price} </p>
                                          <p> <strong>Genre:</strong> {books.genre} </p>
                                          <p> <strong>Description:</strong><i> {books.description} </i></p>
                                          &nbsp;&nbsp;&nbsp;<Button variant="primary" size="sm"
                                                                    onClick={() => props.shoppingCartChange(books)}>
                                                                Add to Shopping Cart
                                                            </Button>
                                          &nbsp;&nbsp;&nbsp;<Button variant="primary" size="sm"
                                                                onClick={() => props.wishListChange(books)}>
                                                                  Add to wishlist
                                                            </Button>
                                          <p><Link to={{pathname: '/MoreBookDetails', state: { email: email, bookID: books._id }}}>More Details about "{books.title}".</Link></p>
                                        </div>
                                    </section>
                              </div>
                              <section >
                                  <p className="Author_Biography"  ><strong>Author biography:</strong><span><i> {books.author_bio} </i></span>
                                  </p>
                              </section>
                              </div>
                              
                            </div>
                          </div>
                    </ListGroup.Item>
               </ListGroup>
            ))}
        </React.Fragment>
      );
}

export default BookDetailsForm;
