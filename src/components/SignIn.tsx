import React, { useContext } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import Form from './Form';
import AuthContext from './contexts/AuthContext';

function SignIn() {
    const navigate = useNavigate();
    const { setEmail, setToken } = useContext(AuthContext);
    const toast = useToast();
    const handleSignIn = (email: string, password: string) => {
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const { user } = userCredential;
                setEmail(user.email ? user.email : '');
                setToken(user.refreshToken);
                navigate('/');
            })
            .catch(() =>
                toast({
                    title: 'Invalid user!',
                    isClosable: true,
                    duration: 5000,
                    status: 'error',
                })
            );
    };
    return <Form title="Sign in" handleClick={handleSignIn} />;
}

export default SignIn;
