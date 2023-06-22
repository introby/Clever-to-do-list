import React, { useState } from 'react';
import { z } from 'zod';
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Stack,
    FormErrorMessage,
    useToast,
} from '@chakra-ui/react';

interface FormProps {
    title: string;
    handleClick: (email: string, password: string) => void;
}

const formSchema = z.object({
    email: z.string().email('Email is not valid'),
    password: z.string().min(6).max(25),
});

function Form({ title, handleClick }: FormProps): JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setError] = useState<
        z.ZodFormattedError<{ email: string; password: string }, string>
    >({ _errors: [] });

    const toast = useToast();

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const formData = Object.fromEntries(form.entries());

        const validationResult = formSchema.safeParse(formData);

        if (!validationResult.success) {
            const validationErrors = validationResult.error.format();
            setError(validationErrors);
            toast({
                title: 'Invalid form data',
                isClosable: true,
                duration: 5000,
                status: 'error',
            });
        } else {
            setError({ _errors: [] });
            handleClick(email, password);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack
                // width="400px"
                spacing="2"
                p="3"
                bg="gray.200"
                sx={{ input: { bg: 'white' } }}
            >
                <FormControl isInvalid={!!errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email"
                    />
                    {errors.email && (
                        <FormErrorMessage>
                            {/* eslint no-underscore-dangle: ["error", { "allow": ["_errors"] }] */}
                            {errors.email._errors.join(', ')}
                        </FormErrorMessage>
                    )}
                </FormControl>
                <FormControl isInvalid={!!errors.password}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                    />
                    {errors.password && (
                        <FormErrorMessage>
                            {errors.password._errors.join(', ')}
                        </FormErrorMessage>
                    )}
                </FormControl>
                <Button type="submit">{title}</Button>
            </Stack>
        </form>
    );
}

export default Form;
