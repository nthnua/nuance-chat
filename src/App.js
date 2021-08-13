import React from 'react';
import { HashRouter, Redirect, Route } from 'react-router-dom';
import { LoginPage } from './features/login/Login';
import { NavBar } from './features/navbar/Navbar';

function App() {
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
