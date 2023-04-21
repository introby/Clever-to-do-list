import { Link } from 'react-router-dom';
import { Heading } from '@chakra-ui/react';
import React from 'react';

function NotFound() {
    return (
        <>
            <Heading>Not Found</Heading>
            <Link to="/">GO HOME</Link>
        </>
    );
}

export default NotFound;
