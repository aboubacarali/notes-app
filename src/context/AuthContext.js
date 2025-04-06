"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);
    const [token, setToken] = useState(undefined);

    useEffect(() => {
        const savedToken = localStorage.getItem('auth_token');
        const savedUser = localStorage.getItem('auth_user');
        if (savedToken && savedUser) {
            const parsedUser = JSON.parse(savedUser);
            if (parsedUser && parsedUser.email && savedToken.length) {
                setUser(parsedUser);
                setToken(savedToken);
            }
            else {
               logOut()
            }
        }
        else {
            logOut()
        }
    }, []);

    const logOut = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
    };

    const logUser = (user, token) => {
        setUser(user);
        setToken(token);
        localStorage.setItem('auth_token', token);
        localStorage.setItem('auth_user', JSON.stringify(user));
    }

    return (
        <AuthContext.Provider value={{ user, token, logOut, logUser }}>
            {children}
        </AuthContext.Provider>
    );
};
