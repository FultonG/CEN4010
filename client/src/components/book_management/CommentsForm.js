import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { Container, Card, Row, Col, Dropdown, DropdownButton, Button } from "react-bootstrap";

function CommentsForm(props) {
    
    return (
        <Container>
              <div class="card">
                <div class="card-header">
                  nickname
                </div>
                <div class="card-body">
                  <blockquote class="blockquote mb-0">
                    <p>Comments go here!...</p>
                    <footer class="blockquote-footer">rating number here</footer>
                  </blockquote>
                </div>
              </div>
        </Container>
    )
}

export default CommentsForm;