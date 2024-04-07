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

import { Link } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <Navbar className="bg-body-tertiary" bg="dark" variant="dark" data-bs-theme="dark">
      <div className="container-fluid">
      <Container>
        <Navbar.Brand href="#home">FlasCards App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Container>
              <Link class="nav-link" to={"/collections"}>Collections</Link>
              { user ? (
              <Link class="nav-link" >Logout ({user})</Link>
              ) : (
              <>
                <Link class="nav-link" to={"/login"}>Login</Link>
                <Link class="nav-link" to={"/signup"}>Sign Up</Link>
              </>
              )}
            </Container>
          </Nav>
        </Navbar.Collapse>
      </Container>
      </div>
    </Navbar>
<br/>

      <Login />

    </div>
  );
}

export default App;
