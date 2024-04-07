import React from 'react';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Navbar'

import Login from './components/login';
import Signup from './components/signup';
import CollectionsList from './components/collections-list';
import CollectionAddEdit from './components/collection-add-edit';
import CardsList from './components/cards-list';
import CardAddEdit from './components/card-add-edit';

function App() {
  return (
    <div className="App">
      <Login />

    </div>
  );
}

export default App;
