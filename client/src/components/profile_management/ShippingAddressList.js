import React, {useState, useEffect} from "react";
import {Card, Button, Container, ListGroup, ButtonGroup, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import API from "../../utils/API";

function ShippingAddressList(props) {
    const [trueAddresses, setTrueAddresses] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState("");
    const [userEmail]  = useState(props.email);

    useEffect(() => {
        updateTrueAddresses();
    }, []);

    function updateTrueAddresses() {
        API.getShippingAddressesByUser({email: userEmail})
            .then(res => {
                setTrueAddresses(res.data);
                setAddresses(res.data);
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }

    function updateAddress(newAddress, index) {
        let newAddresses = addresses;
        newAddresses[index] = {email: userEmail, address: newAddress};
        setAddresses(newAddresses);
    }

    function handleDelete(index) {
        API.deleteShippingAddress(addresses[index]).then(res =>{
            updateTrueAddresses();
            // window.location.reload();
        }).catch(err => console.log(err));
    }

    function handleEdit(index) {
        const shippingAddressUpdate = {
            primaryKeys: {email: userEmail, address: trueAddresses[index].address},
            updates: {$set: {"address": addresses[index].address}}};
        API.updateShippingAddress(shippingAddressUpdate).then(() => {
            updateTrueAddresses();
            alert("Shipping Address updated!");
        }).catch(err => {console.log("Error updating shipping address: " + err)})
    }

    function handleAddressChange(event) {
        setNewAddress(event.currentTarget.value);
    }

    function handleAdd(event) {
        event.preventDefault();
        API.addShippingAddress({ email: userEmail, address: newAddress })
            .then(() => {
                updateTrueAddresses();
                setNewAddress("");
                // window.location.reload();
            })
            .catch(err => console.log(err));
    }

    return (
        <React.Fragment>
                <Card>
                    {addresses.map((address, index) => (
                        <ListGroup key={index}>
                            <ListGroup.Item key={index}>
                                <input type="text" placeholder={address.address} onChange={(event) => {updateAddress(event.target.value, index)}}/>
                                <ButtonGroup className="float-right">
                                    <Button onClick={() => handleEdit(index)}>Save Edit</Button>
                                    <Button onClick={() => handleDelete(index)} variant="danger">Delete</Button>
                                </ButtonGroup>
                            </ListGroup.Item>
                        </ListGroup>
                    ))}
                </Card>
            <Form onSubmit={handleAdd}>
                <Form.Group>
                    <Form.Label>Address:</Form.Label>
                    <Form.Control placeholder="1234 Main St" value={newAddress} onChange={handleAddressChange} />
                </Form.Group>
                <Button className="float-right" type="submit" variant="primary">Save Changes</Button>
            </Form>
        </React.Fragment>
            )
}
export default ShippingAddressList;