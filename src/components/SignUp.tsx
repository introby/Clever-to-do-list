import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Form from './Form';

function SignUp() {
    const navigate = useNavigate();
    const handleSignUp = (email: string, password: string) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const { user } = userCredential;
                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error);
            });
    };
    return <Form title="Sign up" handleClick={handleSignUp} />;
}

export default SignUp;
