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
            ifPurchased: false,
            books: [],
            reviewNickname: '',
            comment: '',
            tempComment: '',
            starRating: 0,
            tempRating: 0,
            bookRate: 0,
            review: {nickname: '', rating: 0, comment: ''},
            reviews: [],
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
        this.updateBookRate.bind(this);
        this.checkIfPurchased.bind(this);
    }

    async componentDidMount() {

        this.updateBooks(this.state.bookID);
        this.defaultReviewName(this.state.myEmail);
        this.checkIfPurchased();
        
    }

    // I'll leave this here until the purchase feature is done
    purchaseBook() {
        const Purchase = {
            user_email: this.state.myEmail,
            book_id: this.state.bookID,
            quantity: 1 
        };
        API.addPurchase(Purchase)
        .then(() => alert("Book Purchased!"))
        .catch(err => console.log(err));
    }

    checkIfPurchased() {
        const Purchase = {
            user_email: this.state.myEmail,
            book_id: this.state.bookID,
        };
        API.getPurchase(Purchase)
        .then(res => {
          if (res.data.book_id == this.state.bookID) {
                     this.setState((state) => {
          return {ifPurchased: true};
      }); }})
        .catch(err => console.log(err));    
  }

    updateBooks(bookID) {
        API.getBook({_id: bookID})
        .then(res => {
            this.setState((state) => {
                return {books: res.data};
            });
            
            this.setState((state) => {
            return {reviews: (res.data.review).slice(0)};
            });
            this.updateBookRate(this.state.reviews)
        })
        .catch(err => console.log(err)); 
    }

    updateBookRate(currentReviews) {
      let value = 0;
      for (let i = 0; i < currentReviews.length; i++) {
        value += currentReviews[i].rating;
      }

      value =  ((value)/(currentReviews.length)).toFixed(2);
      this.setState((state) => {
          return {bookRate: value};
      });
    }


    setReviewName(event) {
        let ifChecked = event.currentTarget.checked;
        
         API.getUser({'email': this.state.myEmail})
        .then (res => {
            if(ifChecked) {
                  this.setState((state) => {
                  return {reviewNickname: 'Anonymous'};
                });

                  this.setState(prevState => {
                  let review = { ...prevState.review };
                  review.nickname = 'Anonymous';
                  return {review}
                });
            }
            else {
                  this.setState((state) => {
                  return {reviewNickname: ((res.data).nickname)};
                });

                  this.setState(prevState => {
                  let review = { ...prevState.review };
                  review.nickname = ((res.data).nickname);
                  return {review}
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
                  this.setState(prevState => {
                  let review = { ...prevState.review };
                  review.nickname = ((res.data).nickname);
                  return {review}
        });

      })
        .catch(err => console.log(err));
    }

    handleSubmit(event) {
      this.setState((state) => {
            return {review: {nickname: this.state.reviewNickname, rating: this.state.tempRating, comment: this.state.tempComment}};
      });
      event.preventDefault();
      const myReview = {
          _id: this.state.bookID,
          review: this.state.review
      }      
      API.addBookReview(myReview).then(res => {
      })
      .catch(err => console.log(err));
    }

    onStarClick(event) {
      this.setState((state) => {
        return {tempRating: event}
      });
      this.setState(prevState => {
        let review = { ...prevState.review };
        review.rating = event;
        return {review}
      });

    }

    setComment(event) {
        let commentString = event.currentTarget.value.toString(event.currentTarget.value);
        this.setState((state) => {
           return {tempComment: commentString}
        });
        this.setState(prevState => {
        let review = { ...prevState.review };
        review.comment = commentString;
        return {review}
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
                                                <p> Rating: {this.state.bookRate} </p>
                                                <p> Price: {this.state.books.price} </p>
                                                <p> Genre: {this.state.books.genre} </p>
                                                <p> Description: {this.state.books.description} </p>
                                                <Button variant="primary" size="sm"
                                                                    onClick={this.purchaseBook.bind(this)}>
                                                                  Purchase Book
                                                </Button>
                                            </div>
                                        </section>
                                        </div>
                                      <section>
                                  <p className="Author_Biography"  >&nbsp;&nbsp;&nbsp;&nbsp;Author biography:<p > {this.state.books.author_bio} </p>
                                  </p>
                              </section>  
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
                                        {this.state.reviews.map((reviews, index) => (
                                        <ListGroup key={index}>
                                          <ListGroup.Item key={index}>
                                            <center style={{paddingTop: "1%" }}> 
                                                  <Container>
                                                        <div class="card">
                                                          <p class="card-header">
                                                          Comment by {this.state.reviews[index].nickname}
                                                          </p>
                                                          <div class="card-body">
                                                            <blockquote class="blockquote mb-0">
                                                              <p>{this.state.reviews[index].comment}</p>
                                                              <footer class="blockquote-footer">Rate given by {this.state.reviews[index].nickname} is: {this.state.reviews[index].rating}</footer>
                                                            </blockquote>
                                                          </div>
                                                        </div>
                                                  </Container>
                                            </center>
                                    </ListGroup.Item>
                                </ListGroup>
                            ))}
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