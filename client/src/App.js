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

    function handleNewUserDetails(newUserDetails) {
        navbar.current.updateDisplayName(newUserDetails);
        setUserDetails(newUserDetails);
    }


    
    return (
        <React.Fragment>
            <NavbarComponent ref={navbar} onNewPage={setCurrPage} onUserLoginLogout={setUserDetails}/>
            {userDetails === null ? <CreateAccountForm/> : null}
            {userDetails !== null && currPage === pages.EDIT_PROFILE ?
                <EditProfileComponent userDetails={userDetails} onNewUserDetails={handleNewUserDetails}/> : null}
        </React.Fragment>
    );
}

export default App;
