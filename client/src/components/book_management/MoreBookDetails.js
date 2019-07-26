/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from "react";
import ReactDOM from 'react-dom';
import './Book.css';
import {Card, Row, Col, Button, ListGroup, ButtonGroup, Form, Container} from "react-bootstrap";
import StarRatingComponent from 'react-star-rating-component';
import API from "../../utils/API";
import ModalImage from "react-modal-image";
import {BrowserRouter as Router, Link, Route, Switch,  } from 'react-router-dom';

class MoreBookDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ifPurchased: true,
            books: [],
            reviewNickname: '',
            comment: '',
            tempComment: '',
            starRating: 0,
            tempRating: 0,
            myEmail: this.props.location.state.email,
            bookID: this.props.location.state.bookID
        };
        this.setReviewName.bind(this);
        this.updateBooks.bind(this);
        this.defaultReviewName.bind(this);
        this.purchaseBook.bind(this);
        this.handleSubmit.bind(this);
        this.onStarClick.bind(this);
        this.setComment.bind(this);

    }

    componentDidMount() {

        this.updateBooks(this.state.bookID);
        this.defaultReviewName(this.state.myEmail);
        this.purchaseBook();

    }

    // I'll leave this here until the purchase feature is done
    purchaseBook() {
        const Purchase = {
            rating: 0,
            comment: '',
            nickname: this.state.reviewNickname,
            quantity: 1 
        };
        API.addPurchase(Purchase)
        .then(() => console("Book Purchased!"))
        .catch(err => console.log(err));
    }

    updateBooks(bookID) {
        API.getBook({_id: bookID})
        .then(res => {
            this.setState((state) => {
                return {books: res.data};
            });
        })
        .catch(err => console.log(err));
        
    }


    setReviewName(event) {
        let ifChecked = event.currentTarget.checked;
         API.getUser({'email': this.state.myEmail})
        .then (res => {
            if(ifChecked) {
                this.setState((state) => {
                return {reviewNickname: 'Anonymous'};
              });
            }
            else {
               this.setState((state) => {
                return {reviewNickname: ((res.data).nickname)};
              });
            }
        })
        .catch(err => console.log(err));
        
    }

    defaultReviewName(email) {
        console.log(email);
        API.getUser({'email': email})
        .then (res => {
            this.setState((state) => {
            return {reviewNickname: ((res.data).nickname)};
              });
        })
        .catch(err => console.log(err));
    }

    handleSubmit(event) {
        event.preventDefault();
        const Rating = {primaryKeys: {"user_email": this.state.myEmail, "book_id": this.state.bookID}, updates: {$set: 
        {"rating": this.starRating}}};
        API.updateRating(Rating)
        .then(() => {
                this.setState((state) => {
                return {starRating: this.state.tempRating};
              });
        })
        .catch(err => console.log(err));

        const Comment = {primaryKeys: {"user_email": this.state.myEmail, "book_id": this.state.bookID}, updates: {$set: 
        {"comment": this.comment}}};
        API.updateComment(Comment)
        .then(() => {
                this.setState((state) => {
                return {comment: this.state.tempComment};
            });
        })
        .catch(err => console(err));
    }

    onStarClick(event) {
      this.setState((state) => {
        return {tempRating: event};
      });

    }

    setComment(event) {
        let commentString = event.currentTarget.value.toString(event.currentTarget.value);
        this.setState((state) => {
            return {tempComment: commentString};
        });
    }


    render() {
    	return(
       			<React.Fragment>
                        <div className="card">
                            <div className="book">
                                <div>
                                    <div className="description">
                                        <section>
                                          <div align="center">
                                            <ModalImage
                                                small={this.state.books.cover_url}
                                                medium={this.state.books.cover_url}
                                                hideZoom={true}
                                                alt={this.state.books.title}
                                            />
                                          </div>
                                        </section>
                                        <section>
                                            <div className="book-info">
                                                <h3> {this.state.books.title} </h3>
                                                <p> By {this.state.books.author}</p>
                                                <p> Publisher: {this.state.books.publisher} </p>
                                                <p> Rating: {this.state.starRating} </p>
                                                <p> Price: {this.state.books.price} </p>
                                                <p> Genre: {this.state.books.genre} </p>
                                                <p> Description: {this.state.books.description} </p>
                                            </div>
                                        </section>
                                      <section>
                                  <div className="Author_Biography"  >Author biography:<p > {this.state.books.author_bio} </p>
                                  </div>
                              </section>
                              </div>
                              <Form onSubmit={this.handleSubmit.bind(this)}>
                              <div className="write-review" >
                                  <center>
                                    <h5>Rate this book</h5>
                                  </center> 
                                  <div>
                                     <center>
                                       <Form.Check type={'checkbox'} label="Be Anonymous?" onChange={this.setReviewName.bind(this)}/>
                                     </center>
                                     <center className="review-name"> How you will appear to other customers: </center>
                                     <center className="review-name">{this.state.reviewNickname}</center>
                                     <center className="rating-stars">
                                        <StarRatingComponent  name={"Rate this book" } value={this.starRating} onStarClick={this.onStarClick.bind(this)} starCount={5} ></StarRatingComponent>
                                     </center>
                                     <center>Tell us what you think</center> 
                                     <center>
                                       <textarea maxLength="500" rows="4" cols="55" onInput={this.setComment.bind(this)} value={this.comment} ></textarea>  
                                         <div style={{paddingTop: "1%" }}>
                                           <Button disabled={!this.state.ifPurchased} variant="primary" size="sm" type="submit">&nbsp;&nbsp;&nbsp;&nbsp;Submit&nbsp;&nbsp;&nbsp;&nbsp;</Button>
                                         </div>
                                <center style={{paddingTop: "1%" }}> 
                                <h4>Rated by {this.state.reviewNickname}</h4>
                                <div class="comment">
                                <h6 class="font-weight-normal"> Rated book a: {this.state.starRating} </h6>
                                <h6 class="font-weight-normal"> {this.state.reviewNickname}'s comment: </h6> 
                                <Col sm={5}>{this.state.comment}</Col>
                                </div>
                                     </center>

                                </center>  
                                  </div>
                              </div>

                              </Form>

                              </div>   
                            </div>
                          </div>
        </React.Fragment>
        )  
    }
      
    }


export default MoreBookDetails;