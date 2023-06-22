import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import AuthContext from './components/contexts/AuthContext';
import AppRoutes from './components/AppRoutes';

function App() {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');

    const authContextProviderValue = useMemo(
        () => ({ email, setEmail, token, setToken }),
        [email, setEmail, token, setToken]
    );

    return (
        <BrowserRouter>
            <ChakraProvider>
                <AuthContext.Provider value={authContextProviderValue}>
                    <AppRoutes />
                </AuthContext.Provider>
            </ChakraProvider>
        </BrowserRouter>
    );
}

export default App;
