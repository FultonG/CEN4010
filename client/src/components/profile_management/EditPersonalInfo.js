import React, { Component } from 'react';
import axios from 'axios';

//https://github.com/FultonG/CEN4010/commit/85f3e4a4407c6e63f0f7ae21587ee2d95b8bc37c
https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/

// TODO(serafin): Connect the front-end to the back-end.
class PersonalInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      address: ''
      
    };

    this.updateFirstname = this.updateFirstname.bind(this);
    this.updateLastname = this.updateLastname.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    
  }

  // UPDATE THE STATE WHEN USER TYPES INTO THE FIELDS
  updateFirstname(evt){
    this.setState({
      firstname: evt.target.value
    });
  }
  updateLastname(evt){
    this.setState({
      lastname: evt.target.value
    });
  }
  updateEmail(evt){
    this.setState({
      email: evt.target.value
    });
  }
  updateAddress(evt){
    this.setState({
      address: evt.target.value
    });
  }
 
  
  // UPDATE AJAX REQUEST FUNCTION
  updatePersonalInfo(evt){
   
    alert('Changes Saved');
  }
  componentDidMount() {
    
  }


  render() {
    return(
      <div className="card">
        <div className="card-header">
          <b>Edit my Personal Information</b>
        </div>
        <div className="card-body">
          <form onSubmit={this.updatePersonalInfo}>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="userFirstName">First Name:</label>
                <input id="userFirstName" className="form-control" type="text" placeholder=" " value={this.state.firstname} onChange={this.updateFirstname}/>
              </div>
              <div className="form-group col">
                <label htmlFor="userLastName">Last Name:</label>
                <input id="userLastName" className="form-control" type="text" placeholder=" " value={this.state.lastname} onChange={this.updateLastname}/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="userEmail">Email:</label>
              <input id="userEmail" className="form-control" type="text" placeholder="" value={this.state.email} onChange={this.updateEmail}/>
            </div>
            <div className="form-group">
              <label htmlFor="userAddress">Address:</label>
              <input  id="userAddress" className="form-control" type="text" placeholder=" " value={this.state.address} onChange={this.updateAddress}/>
            </div>
                       
              
            <button className="btn btn-primary float-right" type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    );
  }
}

export default PersonalInfo;
