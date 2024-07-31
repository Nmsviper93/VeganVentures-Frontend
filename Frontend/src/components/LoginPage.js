import React, { useState } from 'react';
import axios from 'axios';
import axiosInstance from '../Services/axiosInstance';
import { useHistory } from 'react-router-dom';
import '../styles/LoginPage.css'

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const validateForm = () => {
        if (!username || !password) {
            setError('Username and password are required');
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // handle login
            if (isLogin) {
                const response = await axiosInstance.post('/auth/login', { username, password });
                console.log('Login successful:', response.data);
                history.push('/profile');
            } else {
                // handle create profile
                const response = await axiosInstance.post('/auth/register', { username, email, password });
                console.log('Profile create:', response.data);
                history.push('/profile');
            }
        } catch (error) {
            console.error('Error during submission:', error);
        }
    };

    return (
        <div className="login-container">
            <h1>{isLogin ? 'Login' : 'Create Profile'}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                {!isLogin && (
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                )}
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="button" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Create Profile' : 'Login'}
                </button>
                <button type="submit">{isLogin ? 'Login' : 'Create Profile'}</button>
            </form>
        </div>
    );
};

export default LoginPage;
