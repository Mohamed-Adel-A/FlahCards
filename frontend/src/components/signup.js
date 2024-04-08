import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

import { useState } from 'react';


function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setcCnfirmPassword] = useState("");
    const [passwordIsConfirmed, setPasswordIsConfirmed] = useState(true);
    const [usernameConfirmed, setUsernameConfirmed] = useState(true);
    const [signupCompleted, setSignupCompleted] = useState(false);

    const validatingForm = () => {
        if (username === "") {
            setUsernameConfirmed(false);
        } else {
            setUsernameConfirmed(true);
        }

        if (password !== confirmPassword) { 
            setPasswordIsConfirmed(false);
        } else {
            setPasswordIsConfirmed(true);
        }
    }

    const onChangeUsername = e => {
        const username = e.target.value;
        setUsername(username);
        if (username === "") {
            setUsernameConfirmed(false);
        } else {
            setUsernameConfirmed(true);
        }
    }

    const onChangePassword = e => {
        const password = e.target.value;
        setPassword(password);
        if (password !== confirmPassword) { 
            setPasswordIsConfirmed(false);
        } else {
            setPasswordIsConfirmed(true);
        }
    }

    const onChangeConfirmPassword = e => {
        const confirmPassword = e.target.value;
        setcCnfirmPassword(confirmPassword);
        if (password !== confirmPassword) { 
            setPasswordIsConfirmed(false);
        } else {
            setPasswordIsConfirmed(true);
        }
    }


    async function signup(e) {
        e.preventDefault();
        try {
        await props.signup({username: username, password: password});
        setSignupCompleted(true);
        setTimeout(() => props.history.push('/') , 2000);
        } catch (error) {
            ;
        }
        
//        if (completed) {
//            setSignupCompleted(true);
//            props.history.push('/');
//       } else {
//            setSignupCompleted(false);
    }


    return (
        <Container>
            { (signupCompleted) ? (
                <Alert variant="success">
                Signup Completed. You will be directed now.
            </Alert>
            ) : (
                <Alert variant="info">
                    Fill the form to signup for new account
                </Alert>
            )}
            <Form>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="username" 
                        placeholder="Enter username"
                        value={username}
                        onChange={onChangeUsername}
                        isInvalid={!usernameConfirmed}
                    />
                    <Form.Control.Feedback type="invalid">
                    Please Enter the username.
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                            Enter your username
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={onChangePassword}
                        isInvalid={!passwordIsConfirmed}
                    />
                    <Form.Text className="text-muted">
                            Enter your password
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password"
                        value={confirmPassword}
                        onChange={onChangeConfirmPassword}
                        isInvalid={!passwordIsConfirmed}
                    />
                    <Form.Control.Feedback type="invalid">
                    Please Enter match password.
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={signup}>
                    Signup
                </Button>
            </Form>
</Container>
    );
}

export default Login;