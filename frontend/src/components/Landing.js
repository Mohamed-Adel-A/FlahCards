import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Row, Col, Button } from 'react-bootstrap';
import './Landing.css'; // Import the CSS file for additional styling

const Landing = () => {
  return (
    <Container fluid className="landing-page text-center">
      <Row className="header">
        <Col>
        <div className='text-center'>
        <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">Welcome to Flash Cards App</h1>
        </div>
        </Col>
      </Row>
      <br></br>
      <Row className="hero">
        <Col>
          <h2>Learn Smarter, Not Harder</h2>
          <p>Master your subjects with interactive flash cards.</p>
        </Col>
      </Row>
      <Row xs={1} md={3} className="features" >
        <Col>
        <Card style={{"height" : "100%"}}>
        <Card.Body>
          <h3>Customizable Decks</h3>
          <p>Create and organize decks tailored to your study needs.</p>
        </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card style={{"height" : "100%"}}>
        <Card.Body>
          <h3>Interactive Learning</h3>
          <p>Flip cards, track progress, and reinforce knowledge.</p>
        </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card style={{"height" : "100%"}}>
        <Card.Body>
          <h3>Multi-device Sync</h3>
          <p>Access your decks anytime, anywhere, on any device.</p>
          </Card.Body>
        </Card>
        </Col>
      </Row>
      <br></br>
      <Row className="cta">
        <Col>
          <h2>Ready to Get Started?</h2>
        </Col>
      </Row>
      <br></br>
    </Container>
  );
};

export default Landing;
