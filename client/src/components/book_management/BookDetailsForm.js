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
    const [reviewNickname, setReviewNickname] = useState(defaultReviewName);
    console.log(bookAuthor)

    useEffect(() => {
        updatetruebooks();
    }, []);

    function updatetruebooks() {
        console.log("Updating books");
        API.getBooksByPage({page: 1})
        .then(res => {
            console.log(res.data);
            setTrueBooks(res.data);
            setBooks(res.data);
        })
        .catch(err => console.log(err));
    }

    function setReviewName(event) {
        let ifChecked = event.currentTarget.checked;
        API.getUser({email: email})
        .then (res => {
            if(ifChecked) {
                setReviewNickname((res.data).nickname);
            }
            else {
                setReviewNickname((res.data).first_name.concat(' ', (res.data).last_name));
            }
        })
        .catch(err => console.log(err));
    }

    function defaultReviewName() {
        API.getUser({email: email})
        .then (res => {
            setReviewNickname((res.data).first_name.concat(' ', (res.data).last_name));
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
                                          <Link to={{pathname: '/BooksByAuthor', state: { bookAuthor: books.author}}}>By {books.author}</Link>
                                          <p> Publisher: {books.publisher} </p>
                                          <p> Price: {books.price} </p>
                                          <p> Genre: {books.genre} </p>
                                          <p> Rating: (average rating go here!...) </p>
                                          <p> Description: {books.description} </p>
                                          <Button variant="primary" size="sm"
                                                  onClick={() => props.wishListChange(books)}>
                                              Add to wishlist
                                          </Button>
                                          <Button variant="primary" size="sm">
                                              Shopping Cart
                                          </Button>
                                        </div>
                                    </section>
                              </div>
                              <section>
                                  <div className="Author_Biography"  >Author biography:<p > {books.author_bio} </p>
                                  </div>
                              </section>
                              </div>
                              <div className="write-review">
                                  <center>
                                    <h5>Rate this book</h5>
                                  </center>
                                  <div>
                                     <center className="review-name"> How you will appear to other customers: </center>
                                     <center className="review-name">{reviewNickname}</center>
                                     <center>
                                        <Form.Check type={'checkbox'} label="Use Nickname?" onChange={setReviewName}/>
                                     </center>
                                     <center className="rating-stars">
                                        <StarRatingComponent  name={"Rate this book" } starCount={5} ></StarRatingComponent>
                                     </center>
                                     <center>Tell us what you think</center>
                                     <center>
                                       <textarea rows="3" cols="50" ></textarea>
                                         <div style={{paddingTop: "1%" }}>
                                           <Button variant="primary" disabled={!ifPurchased} size="sm" type="submit">&nbsp;&nbsp;&nbsp;&nbsp;Submit&nbsp;&nbsp;&nbsp;&nbsp;</Button>
                                         </div>
                                     </center>
                                  </div>
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
