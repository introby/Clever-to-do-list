import { Heading, Link, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import SignIn from '../components/SignIn';

function Login() {
    return (
        <Stack padding="5px 2rem">
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
        </Stack>
    );
}

export default Login;
