/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from "react";
import './Book.css';
import {Card, Col, Button, ListGroup, ButtonGroup, Form} from "react-bootstrap";
import StarRatingComponent from 'react-star-rating-component';
import API from "../../utils/API";
import {BrowserRouter as Router, Link, Route, Switch,  } from 'react-router-dom';

function BooksByAuthor(props) {
    const [trueAuthor, setTrueAuthor] = useState([]);
    const [Authors, setAuthors] = useState([]);
    const [bookAuthor]  = useState(props.author);
    console.log(props)

    
    useEffect(() => {
        updateTrueAuthor();
    }, []);

    function updateTrueAuthor() {
        console.log("Updating Authors");
        API.getBookByAuthor({author:bookAuthor, page: 1})
        .then(res => {
            console.log(res.data);
            setTrueAuthor(res.data);
            setAuthors(res.data);
        })
        .catch(err => console.log(err));
    }

        return (
          <React.Fragment>  
          {Authors.map((books, index) => (  
              <ListGroup key={index}>
              <ListGroup.Item key={index}>
          <div className="card">
          <div className="book">
              <div>
                 <div className="description">
                  <img class="img" id="book-img" src={books.cover_url} alt="Book" />
                  <div className="book-info">
                    <h3> {books.title} </h3>
                    <p> By {books.author}</p>
                    <p> Publisher: {books.publisher} </p>
                    <p> Price: {books.price} </p>
                    <p> Genre: {books.genre} </p>
                    <p> Description: {books.description} </p>
                    <Button variant="primary" size="sm" onClick={() => props.wishListChange(books)}>
                      Add to wishlist
                    </Button>
                  </div>
                </div>
                <div className="Author_Biography"  >Author biography:<p > {books.author_bio} </p>
                    </div>
              </div >
              <div style={{paddingTop: "1%"}}>
                    <p>Rate this book</p>
                    <div>
                    <div style={{display: 'inline-block', position: 'relative'}} className="rating-stars">
                        <StarRatingComponent  name={"Rate this book" } starCount={5} ></StarRatingComponent>
                    </div>
                    <p>Tell us what you think</p>
                    <textarea rows="3" cols="50" ></textarea>  
                    <div style={{paddingTop: "1%" }}>
                    <Button variant="primary" size="sm" type="submit">&nbsp;&nbsp;&nbsp;&nbsp;Submit&nbsp;&nbsp;&nbsp;&nbsp;</Button>
                    </div>
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

export default BooksByAuthor;