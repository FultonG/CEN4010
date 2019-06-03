import React, {useState, useRef, useEffect} from "react";
import { Form, Button, Container } from "react-bootstrap";
import {Grid, Col} from "react-bootstrap";
import EditNickname from "./EditNickname";
import EditPersonalInfo from "./EditPersonalInfo";
import EditShippingAddresses from "./EditShippingAddresses";
import EditCreditCards from "./EditCreditCards";

/**
 Helpful resourceS:
 https://stackoverflow.com/questions/53351517/react-hooks-skip-first-run-in-useeffect
 https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
 */

function EditProfileComponent(props) {
    const [nickname, setNickname] = useState(props.userDetails.nickname);
    const [email, setEmail] = useState(props.userDetails.email);
    const [firstName, setFirstName] = useState(props.userDetails.first_name);
    const [lastName, setLastName] = useState(props.userDetails.last_name);

    const isFirstRunNickname = useRef(true);
    useEffect(() => {
        if (isFirstRunNickname.current) {
            isFirstRunNickname.current = false;
            return;
        }

        props.onNameUpdate(getUserDetails());
    }, [nickname]); // Only re-run the effect if nickname changes

    function getUserDetails() {
        return {
            nickname: nickname,
            email: email,
            first_name: firstName,
            last_name: lastName};
    }

    return (
        <React.Fragment>
            <Container style={{ paddingTop: "20px" }}>
                <EditNickname nickname={nickname} email={email} onNicknameUpdate={setNickname}/>
                <EditPersonalInfo/>
                <EditShippingAddresses email={email}/>
                <EditCreditCards/>
            </Container>
        </React.Fragment>
    )
}

export default EditProfileComponent;
