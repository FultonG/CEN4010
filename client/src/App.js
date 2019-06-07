import React, { useState } from "react";
import CreateAccountForm from './components/profile_management/CreateAccountForm';
import NavbarComponent from "./components/NavbarComponent";
import EditProfileComponent from "./components/profile_management/EditProfileComponent";

function App() {
    // Null until we make the default page.
    const [currPage, setCurrPage] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const pages = {EDIT_PROFILE: 1};
    const navbar = React.createRef();

    function handleNameUpdate(newUserDetails) {
        navbar.current.updateDisplayName(newUserDetails);

        if (newUserDetails.first_name === userDetails.first_name && newUserDetails.last_name === userDetails.last_name) {
            alert("Nickname updated!");
        } 

        setUserDetails(newUserDetails);
    }


    
    return (
        <React.Fragment>
            <NavbarComponent ref={navbar} onNewPage={setCurrPage} onUserLoginLogout={setUserDetails}/>
            {userDetails === null ? <CreateAccountForm/> : null}
            {userDetails !== null && currPage === pages.EDIT_PROFILE ?
                <EditProfileComponent userDetails={userDetails} onNameUpdate={handleNameUpdate} onUserDetailsUpdate={setUserDetails}/> : null}
        </React.Fragment>
    );
}

export default App;
