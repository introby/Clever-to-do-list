import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { useState } from 'react';
import AuthContext from './components/AuthContext';
import AppRoutes from './components/AppRoutes';

function App() {
    return <AppRoutes />;
}

function WrappedApp() {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    return (
        <BrowserRouter>
            <ChakraProvider>
                <AuthContext.Provider
                    value={{ email, setEmail, token, setToken }}
                >
                    <App />
                </AuthContext.Provider>
            </ChakraProvider>
        </BrowserRouter>
    );
}

export default WrappedApp;
