import React from 'react';
import { useState, useEffect } from 'react';

import CardsDataService from '../services/cards';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from 'react-router-dom'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReactCardFlip from 'react-card-flip';


function CardsList(props) {
    const [cards, setCards] = useState([]);
    const { collectionId } = useParams();

    const [isFlippedItems, setIsFlippedItems] = useState({});

    const toggleItemFlip = (index) => {
        setIsFlippedItems(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const retrieveCards = () => {
        CardsDataService.getAllCards(collectionId, props.token)
        .then(response => {
            setCards(response.data);
            console.log(cards);
        })
        .catch((e) => console.log(e));
    };

    useEffect(() => {
        retrieveCards();
    }, [props.token]);

    const deleteCard = (CardId) => {
        CardsDataService.deleteCard(collectionId, CardId, props.token)
        .then(response => {
            retrieveCards();
        })
        .catch((e) => console.log(e));
    };

    return (
        <Container>
            {(props.token === "" || props.token == null) ? (
                <Alert variant='info'>
                    Please <Link to={"/login"}>login</Link> to see your card collections.
                </Alert>
            ) : (
                <div>
                    <Link to={`/collections/${collectionId}/cards/new`}>
                        <Button variant="success" className="mb-3">
                            Add a Card
                        </Button>
                    </Link>
                    <br/>
                    {cards.map((card) => {
                        return (
                            <>
                            <Row className="align-items-center" >
                                <Col sm={9} className="text-center">
                                    <ReactCardFlip 
                                        key={card.id}
                                        flipDirection="horizontal"
                                        isFlipped={isFlippedItems[card.id]}
                                    >
                                        <div className='front'>
                                            <Card key={card.id} 
                                                className="mb-3" 
                                                data-bs-theme="dark"
                                                onClick={() => toggleItemFlip(card.id)}
                                                style={{"cursor" : "pointer"}}
                                                >
                                                <Card.Body>
                                                <   Card.Title>{card.front}</Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                        <div className='back'>
                                            <Card 
                                                className="mb-3"
                                                data-bs-theme="light"
                                                onClick={() => toggleItemFlip(card.id)}
                                                >
                                                <Card.Body>
                                                    <Card.Text data-bs-theme="light" ><b>{card.back}</b> </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </ReactCardFlip>
                                </Col>
                                <Col>
                                    <div className="d-grid gap-1" style={{"paddingBottom" : "10%"}}>
                                        <Link to={{
                                            pathname: `/collections/${collectionId}/cards/` + card.id,
                                            state: {
                                                currentCard: card
                                            }
                                        }}>
                                            <Button style={{"width":"100%"}} size="sm" variant="warning" className="me-2" >
                                            
                                                Edit
                                                
                                            </Button>
                                        </Link>
                                        <Button size="sm" variant="danger" onClick={() => deleteCard(card.id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                            </>
                        )
                    })}
                </div>
            )
            }
        </Container>
    );
}

export default CardsList;