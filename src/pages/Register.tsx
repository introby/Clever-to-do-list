import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { Heading, Link, Stack, Text } from '@chakra-ui/react';
import SignUp from '../components/SignUp';

function Register() {
    return (
        <Stack padding="5px 2rem">
            <Heading>Register</Heading>
            <SignUp />
            <Text>
                Already have an account?
                <Link
                    as={RouterLink}
                    to="/login"
                    p={2}
                    _activeLink={{ fontWeight: 'bold' }}
                    color="teal.500"
                >
                    Sign in
                </Link>
            </Text>
        </Stack>
    );
}

export default Register;
