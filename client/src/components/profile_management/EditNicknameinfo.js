import React, { Component } from 'react';
import API from '../../utils/API';
import { Form, Alert, Button, Container } from "react-bootstrap";




class NicknameInfo extends React.Component {
  constructor(props){
    super(props);
    this.state = {nickname: ''};

    this.updateNickname = this.updateNickname.bind(this);
    this.updateNicknameInfoForm = this.updateNicknameInfoForm.bind(this);
  }

  updateNickname(event){
    this.setState({nickname: event.target.value});
  }
  updateNicknameInfoForm(event){
    alert('A nickname was submitted: ' + this.state.nickname);
    event.preventDefault();
  }
  componentDidMount() {
  }

  render() {
    return(
      <div className="card">
        <div className="card-header">
          <b>Edit Nickname</b>
        </div>
        <div className="card-body">
          <form onSubmit={this.updateNicknameInfoForm}>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="userNickname">Nickname:</label>
                <input id="userNickname" className="form-control" type="text" placeholder=" " value={this.state.nickname} onChange={this.updateNickname}/>
              </div>
            </div>
            <button className="btn btn-primary float-right" type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    );
  }
}

export default NicknameInfo;