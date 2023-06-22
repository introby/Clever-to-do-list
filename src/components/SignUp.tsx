import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useToast } from '@chakra-ui/react';
import Form from './Form';

function SignUp() {
    const navigate = useNavigate();
    const toast = useToast();
    const handleSignUp = (email: string, password: string) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const { user } = userCredential;
                navigate('/');
            })
            .catch((error) => {
                toast({
                    title: `${error.code} ${error.message}`,
                    isClosable: true,
                    duration: 5000,
                    status: 'error',
                });
            });
    };
    return <Form title="Sign up" handleClick={handleSignUp} />;
}

export default SignUp;
