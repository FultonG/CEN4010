import React, { useState } from "react";
import { Card, Button, Container, ListGroup, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function ShippingAddressList(props) {


    return (
        <Card>
            {props.addresses.map((address, index) => (
                <ListGroup key={index}>
                    <ListGroup.Item key={index}>
                        {address.address}
                        <ButtonGroup className="float-right">
                            <Button onClick={() => props.handleEdit(address)}>Edit</Button>
                            <Button onClick={() => props.handleDelete(address)} variant="danger">Delete</Button>
                        </ButtonGroup>
                    </ListGroup.Item>
                </ListGroup>
            ))}
        </Card>
    )
}

export default ShippingAddressList;