import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../services/api';

type User = {
    id: string;
    name: string;
    login: string;
    avatar_url: string;
}

type AuthContextData = {
    user: User | null;
    signInUrl: string;
    signOut: () => void;
}

export const AuthContext = createContext({
} as AuthContextData);

type AuthProvider = {
    children: ReactNode;
}

type AuthResponse = {
    token: string;
    user: {
        id: string;
        avatar_url: string;
        name: string;
        login: string;
    }
}

export function AuthProvider (props: AuthProvider) {
    const [user, setUser] = useState<User | null>(null);

    // eslint-disable-next-line max-len
    const signInUrl = 'https://github.com/login/oauth/authorize?scope=user&client_id=213b95456777dc0bb425&redirect_uri=http://localhost:3000';

    async function signIn (githubCode: string) {
        const response = await api.post<AuthResponse>('authenticate', {
            code: githubCode
        });

        const { token, user } = response.data;
        api.defaults.headers.common.authorization = `Bearer ${token}`;

        setUser(user);
        localStorage.setItem('@dowhile:token', token);
    }

    function signOut () {
        setUser(null);
        localStorage.removeItem('@dowhile:token');
    }

    useEffect(() => {
        const token = localStorage.getItem('@dowhile:token');

        if (token) {
            api.defaults.headers.common.authorization = `Bearer ${token}`;

            api.get<User>('profile').then(response => {
                setUser(response.data);
            })
        }
    }, [])

    useEffect(() => {
        const url = window.location.href;
        const hasGitHubCode = url.includes('?code=');

        if (hasGitHubCode) {
            const [urlWithoutcode, gitHubCode] = url.split('?code=');

            window.history.pushState({
            }, '', urlWithoutcode);

            signIn(gitHubCode);
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            signInUrl, user, signOut
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}
