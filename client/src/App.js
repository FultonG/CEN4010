import React, { useState } from "react";
import CreateAccountForm from './components/profile_management/CreateAccountForm';
import NavbarComponent from "./components/NavbarComponent";
import EditProfileComponent from "./components/EditProfileComponent";

function App() {
    // Null until we make the default page.
    const [currPage, setCurrPage] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const pages = {EDIT_PROFILE: 1};
  return (
    <React.Fragment>
        <NavbarComponent onNewPage={setCurrPage} onLogout={setUserDetails} onLoginSuccessful={setUserDetails}/>
        {userDetails === null ? <CreateAccountForm/> : null}
        {userDetails !== null && currPage === pages.EDIT_PROFILE ? <EditProfileComponent/> : null}
    </React.Fragment>
  );
}

export default App;
