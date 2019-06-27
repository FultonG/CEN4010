import React, { useState } from 'react';
import API from '../../utils/API';

//https://github.com/FultonG/CEN4010/commit/85f3e4a4407c6e63f0f7ae21587ee2d95b8bc37c
//https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/

// TODO(serafin): Connect the front-end to the back-end.

//Edit ALL (In this case only First and second name)
function EditALL(props) {
  const [userEmail, setUserEmail] = useState(props.email);
  const [officialUserEmail, setOfficialUserEmail] = useState(props.email);
  const [userFistName, setUserFistName] = useState(props.first_name);
  const [userLastName, setUserLastName] = useState(props.last_name);
  const [userHomeAddress, setUserHomeAddress] = useState(props.home_address);

  function updateFirstName(event) {
    setUserFistName(event.target.value);
  }

  function updateLastName(event) {
    setUserLastName(event.target.value);
  }

  function updateHomeAddress(event) {
    setUserHomeAddress(event.target.value);
  }

  function updateUserEmail(event) {
    setUserEmail(event.target.value);
  }

  function submitALL(event) {
    event.preventDefault();
    if (userEmail !== officialUserEmail) {
      const newUserEmailUpdate = {primaryKeys: {email: officialUserEmail}, updates: {$set: {"email": userEmail}}};
      API.updateUserEmail(newUserEmailUpdate).then(() => {
        setOfficialUserEmail(newUserEmailUpdate.updates.$set.email);

        const newPersonalInfo = {
          primaryKeys: {email: newUserEmailUpdate.updates.$set.email},
          updates: {
            $set: {"first_name": userFistName,
              "last_name": userLastName,
              "email": userEmail,
              "home_address": userHomeAddress}
          }
        };

        API.updateUser(newPersonalInfo)
            .then(() => props.onNewPersonalInfo(
                newPersonalInfo.updates.$set.first_name,
                newPersonalInfo.updates.$set.last_name,
                newPersonalInfo.updates.$set.home_address))
            .catch(err => alert("Error updating personal info: " + err));
      }).catch(err => alert("Error updating email: " + err));
    } else {
      const newPersonalInfo = {
        primaryKeys: {email: officialUserEmail},
        updates: {
          $set: {"first_name": userFistName,
            "last_name": userLastName,
            "home_address": userHomeAddress}
        }
      };

      API.updateUser(newPersonalInfo)
          .then(() => props.onNewPersonalInfo(
              newPersonalInfo.updates.$set.first_name,
              newPersonalInfo.updates.$set.last_name,
              newPersonalInfo.updates.$set.email,
              newPersonalInfo.updates.$set.home_address))
          .catch(err => alert(err));
    }
  }

  function checkAlpha(event) {
        let alphaNum = /^[^0-9*|/,#-%.?!":<>[\]{}`\\()';@^&~+_=$]+$/;
        if (!alphaNum.test(event.key)) {
            event.preventDefault();
        }
  }

    return(
      <div className="card">
        <div className="card-header">
          <b>Edit Personal Information</b>
        </div>
        <div className="card-body">
          <form onSubmit={submitALL}>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="userFistName">First Name:</label>
                <input id="userFistName" className="form-control" type="text" placeholder=" " value={userFistName} onKeyPress={checkAlpha} onChange={updateFirstName}/>
              </div>
              <div className="form-group col">
                <label htmlFor="userLastName">Last Name:</label>
                <input id="userLastName" className="form-control" type="text" placeholder=" " value={userLastName} onKeyPress={checkAlpha} onChange={updateLastName}/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="userEmail">Email:</label>
              <input id="userEmail" className="form-control" type="email" placeholder="" value={userEmail} onChange={updateUserEmail} />
            </div>
            <div className="form-group">
              <label htmlFor="userAddress">Home Address:</label>
              <input id="userAddress" className="form-control" type="text" placeholder=" " value={userHomeAddress} onChange={updateHomeAddress}/>
            </div>
                       
              
            <button className="btn btn-primary float-right" type="submit">Save Changes</button>
          </form>
        </div>
        <blockquote class="imgur-embed-pub" lang="en" data-id="1lujzsO"><a href="//imgur.com/1lujzsO">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>
      </div>
    );
}

 

export default EditALL;
