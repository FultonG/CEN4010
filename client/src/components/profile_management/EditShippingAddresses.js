import React, { Component } from 'react';
import API from '../../utils/API';

class EditShippingAddresses extends Component {
  constructor(props){
    super(props);

    this.state= {
      newAddress: '',
      addresses: [{
        address: ''
      }]
    };

    this.email = props.email;
    this.updateAddress = this.updateAddress.bind(this);
  }

  componentDidMount(){
    API.getShippingAddressesByUser(this.email)
        .then(res => {
          this.setState({
            addresses: res.data
          });
          console.log(this.addresses)
        })
        .catch(err => console.log(err));
  }

  // UPDATE THE STATE WHEN USER TYPES INTO THE FIELDS
  updateAddress(evt){
    this.setState({
      newAddress: evt.target.value,
      addresses: this.state.addresses
    });
  }
 
  
  // UPDATE AJAX REQUEST FUNCTION
  updatePersonalInfo(evt){
   
    alert('Changes Saved');
  }


  render() {
    return(
      <div className="card">
        <div className="card-header">
          <b>Edit Shipping Addresses</b>
        </div>
        <div className="card-body">
          <form onSubmit={this.updatePersonalInfo}>
            <div className="form-group">
              <label htmlFor="userAddress">Address:</label>
              <input  id="userAddress" className="form-control" type="text" placeholder=" " value={this.state.newAddress} onChange={this.updateAddress}/>
            </div>
            <button className="btn btn-primary float-right" type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditShippingAddresses;