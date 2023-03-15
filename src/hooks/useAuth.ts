import { useContext } from 'react';
import AuthContext from '../components/AuthContext';

function useAuth() {
    const { email, token } = useContext(AuthContext);

    return {
        isAuth: !!email,
        email,
        token,
    };
}

export default useAuth;
