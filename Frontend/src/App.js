import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import ResultsPage from './components/ResultsPage';
import FavoritesPage from './components/FavoritesPage';
import ProfilePage from './components/ProfilePage';
import ProfileEditPage from './components/ProfileEditPage';
import RegisterPage from './components/RegisterPage';
import RecipeDetailsPage from './components/RecipeDetailsPage';
import Recipes from './components/Recipes';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/App.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // check if user is authenticated
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <div className="app-container">
            <header>
                <h1>Vegan Ventures</h1>
                <nav>
                    <a href="/home">Home</a>
                    {isAuthenticated && <a href="/search">Search</a>}
                    {isAuthenticated && <a href="/favorites">Favorites</a>}
                    <a href="/profile">Profile</a>
                    <a href="/login">Login</a>
                </nav>
            </header>
            <Router>
                <Switch>
                    <ProtectedRoute path="/home" exact component={HomePage} />
                    <ProtectedRoute path="/search" component={SearchPage} />
                    <ProtectedRouteRoute path="/favorites" component={FavoritesPage} />
                    <ProtectedRoute path="/profile" component={ProfilePage} />
                    <Route path="/results" component={ResultsPage} />
                    <Route path="/profile/edit" component={ProfileEditPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/recipe/:id" component={RecipeDetailsPage} />
                    <Route path="/recipes" component={Recipes} />
                    <Redirect from="/" to="/login" />
                </Switch>
            </Router>
            <footer>
                <p>&copy; 2024 Vegan Ventures</p>
            </footer>
        </div>
    );

export default App;
