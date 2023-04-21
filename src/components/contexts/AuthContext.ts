import { createContext } from 'react';

interface AuthContextType {
    email: string;
    setEmail: (email: string) => void;
    token: string;
    setToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType>({
    email: '',
    token: '',
    setEmail(email: string): void {},
    setToken(token: string): void {},
});

export default AuthContext;
