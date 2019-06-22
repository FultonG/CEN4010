import React, { useState, useRef, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Grid, Col, Spinner} from "react-bootstrap";
import EditNickname from "./EditNickname";
import EditPersonalInfo from "./EditPersonalInfo";
import EditShippingAddresses from "./EditShippingAddresses";
import EditCreditCards from "./EditCreditCards";
import API from "../../utils/API";

/**
 Helpful resourceS:
 https://stackoverflow.com/questions/53351517/react-hooks-skip-first-run-in-useeffect
 https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
 */

function EditProfileComponent(props) {
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState(props.userDetails.username);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [homeAddress, setHomeAddress] = useState("");
    const [renderChildren, setRenderChildren] = useState(false);

    useEffect(() => {
        API.getUser({ email: email }).then(res => {
            setNickname(res.data.nickname);
            setFirstName(res.data.first_name);
            setLastName(res.data.last_name);
            setHomeAddress(res.data.home_address);
            setRenderChildren(true);
        })
    }, []);

    function setPersonalInfo(newFirstName, newLastName, newEmail, newHomeAddress) {
        setFirstName(newFirstName);
        setLastName(newLastName);
        setEmail(newEmail);
        setHomeAddress(newHomeAddress);
        alert("Personal Info updated!");
    }

    function handleNewNickname(newNickname) {
        setNickname(newNickname);
        alert("Nickname updated!");
    }

    function getUserDetails() {
        return {
            nickname: nickname,
            email: email,
            first_name: firstName,
            last_name: lastName,
            home_address: homeAddress
        };
    }

    return (
        <React.Fragment>
            <Container style={{ paddingTop: "20px" }}>
                {renderChildren ?
                    <React.Fragment>
                        <EditNickname nickname={nickname} email={email} onNicknameUpdate={handleNewNickname} />
                        <EditPersonalInfo first_name={firstName} last_name={lastName} email={email} home_address={homeAddress} onNewPersonalInfo={setPersonalInfo} />
                        <EditShippingAddresses email={email} />
                        <EditCreditCards />
                    </React.Fragment>
                    : <Spinner animation="border" variant="primary" />}
            </Container>
        </React.Fragment>
    )
}

export default EditProfileComponent;
