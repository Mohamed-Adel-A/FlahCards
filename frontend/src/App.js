import React from 'react';
import { useState } from 'react';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Navbar'

import Login from './components/login';
import Signup from './components/signup';
import CollectionsList from './components/collections-list';
import CollectionAddEdit from './components/collection-add-edit';
import CardsList from './components/cards-list';
import CardAddEdit from './components/card-add-edit';

import { Link, Switch, Route } from 'react-router-dom';

import UserDataService from './services/user';

function App() {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [error, setError] = useState('');

  async function login(user = null) {
    UserDataService.login(user)
    .then(response =>{
      setUser(user.username);
      setToken(response.data.token);
      localStorage.setItem('user', user.username);
      localStorage.setItem('token', response.data.token);
      setError('');
    })
    .catch((e) => {
      console.log('login', e);
      setError(e.toString());
    })
  }

  const logout = () => {
    UserDataService.logout(token)
    setUser('');
    setToken('');
    localStorage.setItem('user', '');
    localStorage.setItem('token', '');
    setError('');
    
  }

  const signup = (user = null) => {
    UserDataService.signup(user)
    .then(response =>{
      setUser(user.username);
      setToken(response.data.token);
      localStorage.setItem('user', user.username);
      localStorage.setItem('token', response.data.token);
      setError('');
    })
    .catch((e) => {
      console.log('login', e);
      setError(e.toString());
    })
  }

  return (
    <div className="App">
      <Navbar className="bg-body-tertiary" bg="dark" variant="dark" data-bs-theme="dark">
      <div className="container-fluid">
      <Container>
        <Navbar.Brand href="/">FlasCards App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Container>
              <Link className="nav-link" to={"/collections"}>Collections</Link>
              { user ? (
              <Link className="nav-link" to="" onClick={logout}>Logout ({user})</Link>
              ) : (
              <>
                <Link className="nav-link" to={"/login"}>Login</Link>
                <Link className="nav-link" to={"/signup"}>Sign Up</Link>
              </>
              )}
            </Container>
          </Nav>
        </Navbar.Collapse>
      </Container>
      </div>
    </Navbar>
    <br/>

    <div className="container mt-4">
        <Switch>
          <Route exact path={["/", "/collections"]} render={(props) =>
            <CollectionsList {...props} token={token} />
          }>
          </Route>

          <Route path="/collections/new" render={(props)=>
            <CollectionAddEdit {...props} token={token} />
          }>
          </Route>

          <Route path="/collections/:collectionId/cards/new" render={(props)=>
            <CardAddEdit {...props} token={token} />
          }>
          </Route>

          <Route path="/collections/:collectionId/cards/:cardId" render={(props)=>
            <CardAddEdit {...props} token={token} />
          }>
          </Route>

          <Route path="/collections/:collectionId/cards/" render={(props)=>
            <CardsList {...props} token={token} />
          }>
          </Route>

          <Route exact path="/collections/:id/" render={(props)=>
            <CollectionAddEdit {...props} token={token} />
          }>
          </Route>

          <Route exact path="/login" render={(props)=>
            <Login {...props} login={login} />
          }>
          </Route>

          <Route path="/signup" render={(props)=>
            <Signup {...props} signup={signup} />
          }>
          </Route>
        </Switch>
      </div>

      <footer className="text-center text-lg-start bg-light text-muted mt-4">
        <div className="text-center p-4">
          © 2024 Flash Cards App - <a
            target="_blank"
            className="text-reset fw-bold text-decoration-none"
            href=""
          >
            Mohamed Adel
          </a>
        </div>
      </footer>

    </div>
  );
}

export default App;
