import React, { useEffect, useState } from 'react';
import API from '../../utils/API';
import ShippingAddressList from './ShippingAddressList';
import { Card, Form, Button } from 'react-bootstrap';

// Stick to database diagram: https://drive.google.com/file/d/1SsKnQoe0B_wKTRp6rKocK9oaolqMd1OT/view?usp=sharing
const EditShippingAddresses = (props) => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [email, setEmail] = useState(props.email)

  useEffect(() => {
    API.getShippingAddressesByUser({email})
      .then(res => {
        setAddresses(res.data);
      })
      .catch(err => console.log(err));
  }, []);



  // UPDATE AJAX REQUEST FUNCTION
  function handleSubmit(event) {
    event.preventDefault();
    API.addShippingAddress({ email: email, address: newAddress })
      .then(res => {
        window.location.reload();
      })
      .catch(err => console.log(err));
  }

  function handleAddressChange(event) {
    setNewAddress(event.currentTarget.value);
  }


  function handleDeleteAddress(address) {
    API.deleteShippingAddress(address).then(res =>{
      window.location.reload();
    })
    .catch(err => console.log(err));
  }

  function handleEditAddress(address) {
    console.log(address);
  }


  return (
    <Card>
      <Card.Header>
        <b>Edit Shipping Addresses</b>
      </Card.Header>
      <Card.Body>
        {addresses.length > 0 ? <ShippingAddressList addresses={addresses} handleEdit={handleEditAddress} handleDelete={handleDeleteAddress}></ShippingAddressList> : null}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Address:</Form.Label>
            <Form.Control placeholder="1234 Main St" value={newAddress} onChange={handleAddressChange} />
          </Form.Group>
          <Button className="float-right" type="submit" variant="primary">Save Changes</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default EditShippingAddresses;
