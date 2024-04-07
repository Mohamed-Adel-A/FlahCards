import React from 'react';
import { useState } from 'react';

import CardsDataService from '../services/cards';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Link, useParams } from 'react-router-dom';

function CardAddEdit(props) {
    let editing = false;
    let initialCardFront = "";
    let initialCardBack = "";

    const { collectionId, cardId } = useParams();

    
    if (props.location.state && props.location.state.currentCard) {
        editing = true;
        initialCardFront = props.location.state.currentCard.front;
        initialCardBack = props.location.state.currentCard.back;
    }

    const [front, setFront] = useState(initialCardFront);
    const [back, setBack] = useState(initialCardBack);

    // keeps track if submitted
    const [submitted, setSubmitted] = useState(false);

    const onChangefront = e => {
        const front = e.target.value;
        setFront(front);
    }
    const onChangeback = e => {
        const back = e.target.value;
        setBack(back);
    }


    const saveCard = () => {
        var data = {
            front: front,
            back: back,
        }

        if (editing) {
            CardsDataService.updateCard(
                collectionId,
                props.location.state.currentCard.id,
                data, props.token)
            .then(response => {
                setSubmitted(true);
                props.history.push(`/collections/${collectionId}/cards/`);
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            })
        } else {
            CardsDataService.createCard(collectionId, data, props.token)
            .then(response => {
                setSubmitted(true);
                props.history.push(`/collections/${collectionId}/cards/`);
            })
            .catch(e => {
                console.log(e);
            });
        }
    }

    return (
        <Container>
            {submitted ? (
                <div>
                    <h4>Card submitted successfully</h4>
                    <Link to={`/collections/${collectionId}/cards/`}>
                        Back to the Collection
                    </Link>
                </div>
            ) : (
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>{editing ? "Edit" : "Create"} a Card</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            placeholder="Card Front / Quesion"
                            value={front}
                            onChange={onChangefront}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Back</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            placeholder="Card Back / Answer"
                            value={back}
                            onChange={onChangeback}
                        />
                    </Form.Group>
                    
                    <Button variant="info" onClick={saveCard}>
                        {editing ? "Edit" : "Add"} Card
                    </Button>
                </Form>
            )}
        </Container>
    );
}

export default CardAddEdit;