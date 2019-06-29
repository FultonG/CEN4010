import React from "react";
import StarRatingComponent from 'react-star-rating-component';
import { Button, Container } from "react-bootstrap";

/** 
  *  This is obviously not a real book found in the database. It's an example book 
  *  page I created for the sake of getting started on the ratings and comments feature.
  *
  *  -Carlos
*/

function ViewExampleBook() {
    return(
        <React.Fragment>
            <Container style={{ paddingTop: "20px" }}>
                <h2>The Fellowship of the Ring</h2>
                <img src="https://images-na.ssl-images-amazon.com/images/I/51tW-UJVfHL._SX321_BO1,204,203,200_.jpg"></img>
                <div style={{paddingTop: "3%"}}>
                    <h3>Rate this book</h3>
                    <div style={{fontSize: 40}}>
                        <StarRatingComponent starCount={5}></StarRatingComponent>
                    </div>
                    <h3>Tell us what you think</h3>
                    <textarea rows="4" cols="50"></textarea>  
                    <div style={{paddingTop: "1%"}}>
                    <Button type="submit">Submit</Button>
                    </div>
                </div>     
                </Container>     
        </React.Fragment>
            
    );
}

export default ViewExampleBook;
