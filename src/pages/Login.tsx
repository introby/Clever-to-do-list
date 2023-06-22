import {
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Text,
} from '@chakra-ui/react';
import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import SignIn from '../components/SignIn';

function Login() {
    return (
        <Stack mx="auto" width="400px" padding="5px 2rem">
            <Heading textAlign="center">Login</Heading>
            <SignIn />
            <Text align="left">
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
