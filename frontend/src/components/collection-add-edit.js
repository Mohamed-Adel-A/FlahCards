import React from 'react';
import { useState } from 'react';

import CollectionsDataService from '../services/collections';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

function CollectionAddEdit(props) {
    let editing = false;
    let initialCollectionName = "";
    let initialCollectionDescrip = "";
    let initialCollectionCategory = "";

    if (props.location.state && props.location.state.currentCollection) {
        editing = true;
        initialCollectionName = props.location.state.currentCollection.name;
        initialCollectionDescrip = props.location.state.currentCollection.description;
        initialCollectionCategory = props.location.state.currentCollection.category;
    }

    const [name, setName] = useState(initialCollectionName);
    const [description, setDescription] = useState(initialCollectionDescrip);
    const [category, setCategory] = useState(initialCollectionCategory);

    // keeps track if submitted
    const [submitted, setSubmitted] = useState(false);

    const onChangeName = e => {
        const name = e.target.value;
        setName(name);
    }
    const onChangeDescrip = e => {
        const description = e.target.value;
        setDescription(description);
    }
    const onChangeCategory = e => {
        const category = e.target.value;
        setCategory(category);
    }

    const saveCollection = () => {
        var data = {
            name: name,
            description: description,
            category: category,
        }

        if (editing) {
            CollectionsDataService.updateCollection(
                props.location.state.currentCollection.id,
                data, props.token)
            .then(response => {
                setSubmitted(true);
                props.history.push('/collections');
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            })
        } else {
            CollectionsDataService.createCollection(data, props.token)
            .then(response => {
                setSubmitted(true);
                props.history.push('/collections');
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
                    <h4>Collection submitted successfully</h4>
                    <Link to={"/collections/"}>
                        Back to Collections
                    </Link>
                </div>
            ) : (
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>{editing ? "Edit" : "Create"} a Collection</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            placeholder="e.g. Math FlashCards"
                            value={name}
                            onChange={onChangeName}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            value={description}
                            onChange={onChangeDescrip}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            value={category}
                            onChange={onChangeCategory}
                        />
                    </Form.Group>
                    <Button variant="info" onClick={saveCollection}>
                        {editing ? "Edit" : "Add"} Collection
                    </Button>
                </Form>
            )}
        </Container>
    )
}

export default CollectionAddEdit;