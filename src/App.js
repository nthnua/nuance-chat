import React from 'react';
import { useSelector } from 'react-redux';
import { HashRouter, Redirect, Route } from 'react-router-dom';
import { LoginPage } from './features/auth/login/Login';
import { NavBar } from './features/navbar/Navbar';

function App() {

  const auth_token = useSelector(state => state.auth.token)
  console.log(auth_token)
  if (!auth_token) {
    return (<LoginPage></LoginPage>)
  }

  return (
    <HashRouter>
      <NavBar></NavBar>
      <Route path='/login'>
        <LoginPage></LoginPage>
      </Route>
      <Route path='/'><Redirect to='/login' /></Route>
    </HashRouter>
  );
}

export default App;
