import { Heading, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import SignIn from '../components/SignIn';

function Login() {
    return (
        <>
            <Heading>Login</Heading>
            <SignIn />
            <Text>
                or
                <Link
                    as={RouterLink}
                    to="/register"
                    p={2}
                    _activeLink={{ fontWeight: 'bold' }}
                    color="teal.500"
                >
                    Register
                </Link>
            </Text>
        </>
    );
}

export default Login;
