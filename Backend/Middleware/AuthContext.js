import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                // retrieve token from localStorage
                const token = localStorage.getItem('authToken');

                // if no token, set isAuthenticated to false
                if (!token) {
                    setIsAuthenticated(false);
                    return;
                }

                // API call to check authentication status
                const response = await axios.get('/api/auth/check-status', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setIsAuthenticated(response.data.isAuthenticated);
            } catch (error) {
                console.error('Error checking auth status', error);
                setIsAuthenticated(false);
            }
        };

        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);