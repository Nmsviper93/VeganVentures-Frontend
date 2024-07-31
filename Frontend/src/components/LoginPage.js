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
    
    //     if (!validateForm()) return;
        
    //     try {
    //         const response = await axios.post('/api/users/login', { username, password });
    //         localStorage.setItem('jwtToken', response.data.token);
    //         history.push('/');
    //     } catch (error) {
    //         setError('Invalid username or password');
    //     }
    // };

    // const handleLogin = async (event) => {
    //     event.preventDefault();
    //     try {
    //         const response = await axiosInstance.post('/login', { username, password });
    //         // Assuming successful login, redirect to home or another page
    //         history.push('/');
    //     } catch (error) {
    //         setError('Invalid credentials. Please try again.');
    //     }
    // };

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
                <button type="submit">{isLogin ? 'Login' : 'Create Profile'}</button>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Create Profile' : 'Login'}
            </button>
            </form>
        </div>
    );
};
    
//                 <div>
//                     <label>Username</label>
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label>Password</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

export default LoginPage;
