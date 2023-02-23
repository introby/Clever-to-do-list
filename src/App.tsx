import { HashRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

function WrappedApp() {
    return (
        <HashRouter>
            <ChakraProvider>
                <App />
            </ChakraProvider>
        </HashRouter>
    );
}

export default WrappedApp;
