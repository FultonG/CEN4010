import React from 'react';
import LoginForm from './components/LoginForm';
import CreateAccountForm from './components/CreateAccountForm';

function App() {
  return (
    <React.Fragment>
      <LoginForm></LoginForm>
      <CreateAccountForm></CreateAccountForm>
    </React.Fragment>
  );
}

export default App;
