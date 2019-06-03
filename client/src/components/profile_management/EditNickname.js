import React, { useState } from 'react';
import API from '../../utils/API';
import { Form, Alert, Button, Container } from "react-bootstrap";

function EditNickname(props) {
  const [userEmail, setUserEmail] = useState(props.email);
  const [userNickname, setUserNickname] = useState(props.nickname);

  function updateNickname(event) {
    setUserNickname(event.target.value);
  }

  function submitNicknameUpdate(event) {
    event.preventDefault();
    const nicknameUpdate = {primaryKeys: {email: userEmail}, updates: {$set: {"nickname": userNickname}}};
    API.updateUser(nicknameUpdate)
        .then(() => props.onNicknameUpdate(nicknameUpdate.updates.$set.nickname))
        .catch(err => alert(err));
  }

    return(
      <div className="card">
        <div className="card-header">
          <b>Edit Nickname</b>
        </div>
        <div className="card-body">
          <form onSubmit={submitNicknameUpdate}>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="userNickname">Nickname:</label>
                <input id="userNickname" className="form-control" type="text" placeholder=" " value={userNickname} onChange={updateNickname}/>
              </div>
            </div>
            <button className="btn btn-primary float-right" type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    );
}

export default EditNickname;