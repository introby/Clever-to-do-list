import React from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Form from './Form';

function SignIn() {
    const navigate = useNavigate();
    const handleSignIn = (email: string, password: string) => {
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const { user } = userCredential;
                navigate('/');
            })
            .catch(() => alert('Invalid user!'));
    };
    return <Form title="Sign in" handleClick={handleSignIn} />;
}

export default SignIn;
