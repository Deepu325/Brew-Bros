import React, { createContext, useContext, useState } from 'react';
import { API_URL } from '../config';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('admin_token'));
    const [admin, setAdmin] = useState(localStorage.getItem('admin_user'));

    const login = async (username, password) => {
        const res = await fetch(`${API_URL}/api/admin/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        if (!res.ok) throw new Error('Invalid credentials');
        const data = await res.json();
        localStorage.setItem('admin_token', data.access);
        localStorage.setItem('admin_user', data.username);
        setToken(data.access);
        setAdmin(data.username);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        setToken(null);
        setAdmin(null);
    };

    const authFetch = (url, options = {}) => {
        const headers = { ...(options.headers || {}) };
        // If the body is not FormData, default to JSON
        if (!(options.body instanceof FormData) && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json';
        }
        // Always include Authorization header
        headers['Authorization'] = `Bearer ${token}`;
        return fetch(url, { ...options, headers });
    };

    return (
        <AuthContext.Provider value={{ token, admin, login, logout, authFetch, isAuth: !!token }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
