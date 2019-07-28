import React, { useState } from "react";
import CreateAccountForm from './components/profile_management/CreateAccountForm';
import NavbarComponent from "./components/NavbarComponent";
import EditProfileComponent from "./components/profile_management/EditProfileComponent";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Auth from "./utils/AuthService"
import PrivateRoute from "./components/PrivateRoute";
import CreateBookForm from "./components/book_management/CreateBookForm";
import BookDetailsForm from "./components/book_management/BookDetailsForm";
import MoreBookDetails from "./components/book_management/MoreBookDetails";
import BooksByAuthor from "./components/book_management/BooksByAuthor";
import CommentsForm from "./components/book_management/CommentsForm";
import WishList from "./components/WishList/WishList";
import Cart from "./components/ShoppingCart/cart";
import API from "./utils/API";

function App() {
    // Null until we make the default page.
    const [userDetails, setUserDetails] = useState(null);
    const [wishList, setWishList] = useState([]);
    const [shoppingCart, setShoppingCart] = useState([]);

    function handleSetUserDetails(user){
        setUserDetails(user);
    }

    function handleWishListChange(book){
        API.addBookToWishList(Auth.getProfile().username, 1, book).then(res=> console.log(res)).catch(err => console.log(err))
        setWishList([...wishList, book]);
    }

    function handleShoppingCartChange(book){
        API.addToCart(Auth.getProfile().username, book, 1).then(res=> console.log(res)).catch(err => console.log(err))
        setShoppingCart([...shoppingCart, book]);
    }

    return (
        <Router>
            <NavbarComponent wishList={wishList}/>
            <Route path="/register" component={CreateAccountForm}/>
            <Route path="/CreateBookForm" component={CreateBookForm}/>
            <Route path="/BooksByAuthor" component={BooksByAuthor}/>
            <Route path="/Cart" component={() => <Cart userEmail={Auth.getProfile().username}/>}/>
            <Route path="/CommentsForm" component={CommentsForm}/>
            <Route path="/BookDetailsForm" component={() => <BookDetailsForm userEmail={Auth.getProfile().username} wishListChange={handleWishListChange} shoppingCartChange={handleShoppingCartChange}></ BookDetailsForm>}/>
            <Route path="/MoreBookDetails" component={MoreBookDetails}/>
            <PrivateRoute path="/editProfile" component={() => <EditProfileComponent userEmail={Auth.getProfile().username}/>}/>
            <PrivateRoute path="/WishList" component={() => <WishList userEmail={Auth.getProfile().username}/>}/>
        </Router>
    );
}

export default App;
