/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from "react";
import ReactDOM from 'react-dom';
import './Book.css';
import {Card, Col, Button, ListGroup, ButtonGroup, Form} from "react-bootstrap";
import StarRatingComponent from 'react-star-rating-component';
import API from "../../utils/API";
import ModalImage from "react-modal-image";
import {BrowserRouter as Router, Link, Route, Switch,  } from 'react-router-dom';

class BooksByAuthor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
        this.updateBooks.bind(this);
    }

    componentDidMount() {
        const {bookAuthor}  = this.props.location.state;
        this.updateBooks(bookAuthor);
    }

    updateBooks(bookAuthor) {
        console.log("AUTHOR NAME: " + bookAuthor);
        API.getBookByAuthor({author:bookAuthor, page: 1})
        .then(res => {
            console.log("AUTHOR BOOKS: ");
            console.log(res.data);
            this.setState((state) => {
                return {books: res.data};
            });
        })
        .catch(err => console.log(err));
    }

    render() {
       return <React.Fragment>
            {this.state.books.map((books, index) => (
                <ListGroup key={index}>
                    <ListGroup.Item key={index}>
                        <div className="card">
                            <div className="book">
                                <div>
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
                                                <p> By {books.author}</p>
                                                <p> Publisher: {books.publisher} </p>
                                                <p> Price: {books.price} </p>
                                                <p> Genre: {books.genre} </p>
                                                <p> Description: {books.description} </p>
                                                <Button variant="primary" size="sm"
                                                        onClick={() => {}}>
                                                    Add to wishlist
                                                </Button>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            ))}
        </React.Fragment>;
    }
      
    }


export default BooksByAuthor;