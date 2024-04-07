import React from 'react';
import { useState, useEffect } from 'react';

import CollectionsDataService from '../services/collections';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import moment from 'moment';

function CollectionsList(props) {
    const [collections, setCollections] = useState([]);

    const retrieveCollections = () => {
        CollectionsDataService.getAll(props.token)
        .then(response => {
            setCollections(response.data);
            console.log(collections);
        })
        .catch((e) => console.log(e));
    };

    useEffect(() => {
        retrieveCollections();
    }, [props.token]);

    const deleteCollection = (collectionId) => {
        CollectionsDataService.deleteCollection(collectionId, props.token)
        .then(response => {
            retrieveCollections();
        })
        .catch((e) => console.log(e));
    };

    return (
        <Container>
            {(props.token === "" || props.token == null) ? (
                <Alert variant='warning'>
                    Please <Link to={"/login"}>login</Link> or <Link to={"/signup"}>signup</Link> to see your card collections.
                </Alert>
            ) : (
                <div>
                    <Link style={{"margin-right":"2px"}} to={"/collections"}>
                        <Button variant="primary" className="mb-3" onClick={retrieveCollections}>
                            Refresh
                        </Button>
                    </Link>
                    
                    <Link to={"/collections/new"}>
                        <Button variant="success" className="mb-3">
                            Add a Collection
                        </Button>
                    </Link>
                    <br/>
                    {collections.map((collection) => {
                        return (
                            <Card key={collection.id} className="mb-3" data-bs-theme="dark">
                                <Card.Body>
                                    <div style={{"margin-bottom":"1%"}}>
                                        <Card.Title>{collection.name}</Card.Title>
                                        <Card.Text><b>Description:</b> {collection.description}</Card.Text>
                                        <Card.Text><b>Category:</b> {collection.category}</Card.Text>
                                        <Card.Text><b>Created at:</b> {moment(collection.created_at).format("Do MMMM YYYY")}</Card.Text>
                                    </div>
                                    <div>
                                    <Link to={{
                                        pathname: "/collections/" + collection.id + "/cards",
                                        state: {
                                            currentCollection: collection
                                        }
                                        }}>
                                        <Button variant="outline-info" className="me-2">
                                            Cards
                                        </Button>
                                    </Link>
                                    <Link to={{
                                        pathname: "/collections/" + collection.id,
                                        state: {
                                            currentCollection: collection
                                        }
                                        }}>
                                        <Button variant="outline-warning" className="me-2">
                                            Edit collection data
                                        </Button>
                                    </Link>
                                    <Button variant="outline-danger" onClick={() => deleteCollection(collection.id)}>
                                        Delete
                                    </Button>
                                    </div>
                                </Card.Body>
                    </Card>
                        )
                    })}
                </div>
            )
            }
        </Container>
    );
}

export default CollectionsList;