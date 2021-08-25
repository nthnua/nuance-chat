import React from 'react';
import { useSelector } from 'react-redux';
import { HashRouter, Redirect, Route } from 'react-router-dom';
import { LoginPage } from './features/auth/login/Login';
import { NavBar } from './features/navbar/Navbar';
import { Lounge } from './features/lounge/Lounge'

function App() {
  const login_status = useSelector(state => state.auth.session.status)
  if (login_status === 'logged-out') {
    return (<LoginPage></LoginPage>)
  }
  else if (login_status === 'logged-in')
    return (
      <HashRouter>
        <NavBar></NavBar>
        <Lounge></Lounge>
      </HashRouter>
    );
}

export default App;
