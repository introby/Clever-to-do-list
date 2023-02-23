function useAuth() {
    const email = 'email';
    const token = '';
    const id = '';
    return {
        isAuth: !!email,
        email,
        token,
        id,
    };
}

export default useAuth;
