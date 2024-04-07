import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

import { useState } from 'react';


function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onChangeUsername = e => {
        const username = e.target.value;
        setUsername(username);
    }

    const onChangePassword = e => {
        const password = e.target.value;
        setPassword(password);
    }

    const signup = () => {
        props.signup({username: username, password: password});
        props.history.push('/');
    }

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="username" 
                        placeholder="Enter username"
                        value={username}
                        onChange={onChangeUsername}
                    />
                    <Form.Text className="text-muted">
                            Enter your username
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={onChangePassword}
                    />
                    <Form.Text className="text-muted">
                            Enter your password
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={signup}>
                    Signup
                </Button>
            </Form>
</Container>
    );
}

export default Login;