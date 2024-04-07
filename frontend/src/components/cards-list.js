import React from 'react';
import { useState, useEffect } from 'react';

import CardsDataService from '../services/cards';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from 'react-router-dom'

import ReactFlipCard from 'reactjs-flip-card'
import moment from 'moment';

function CardsList(props) {
    const [cards, setCards] = useState([]);
    const { collectionId } = useParams();

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
        CardsDataService.deleteCollection(collectionId, CardId, props.token)
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
                            <Card key={card.id} className="mb-3" data-bs-theme="dark">
                                <Card.Body>
                                    <div style={{"margin-bottom":"1%"}}>
                                        <Card.Title>{card.name}</Card.Title>
                                        <Card.Text><b>Front:</b> {card.front}</Card.Text>
                                        <Card.Text><b>Back:</b> {card.back}</Card.Text>
                                    </div>
                                    <div>
                                        <Link to={{
                                            pathname: `/collections/${collectionId}/cards/` + card.id,
                                            state: {
                                                currentCollection: card
                                            }
                                            }}>
                                            <Button variant="outline-warning" className="me-2">
                                                Edit Card
                                            </Button>
                                        </Link>
                                        <Button variant="outline-danger" onClick={() => deleteCard(card.id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </Card.Body>
                                
                            </Card>
                    
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