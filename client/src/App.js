import React, { useState } from "react";
import CreateAccountForm from './components/profile_management/CreateAccountForm';
import NavbarComponent from "./components/NavbarComponent";
import EditProfileComponent from "./components/profile_management/EditProfileComponent";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Auth from "./utils/AuthService"
import PrivateRoute from "./components/PrivateRoute";

function App() {
    // Null until we make the default page.
    const [userDetails, setUserDetails] = useState(null);

    function handleSetUserDetails(user){
        setUserDetails(user);
    }

    return (
        <Router>
            <NavbarComponent/>
            <Route path="/register" component={CreateAccountForm}/>
            <PrivateRoute path="/editProfile" component={() => <EditProfileComponent userEmail={Auth.getProfile().username}/>}/>
        </Router>
    );
}

export default App;
