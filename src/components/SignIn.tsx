import React, { useContext } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Form from './Form';
import AuthContext from './AuthContext';

function SignIn() {
    const navigate = useNavigate();
    const { setEmail, setToken } = useContext(AuthContext);
    const handleSignIn = (email: string, password: string) => {
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const { user } = userCredential;
                setEmail(user.email ? user.email : '');
                setToken(user.refreshToken);
                navigate('/');
            })
            .catch(() => alert('Invalid user!'));
    };
    return <Form title="Sign in" handleClick={handleSignIn} />;
}

export default SignIn;
