import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ResultsPage from './pages/ResultsPage';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';
import ProfileEditPage from './pages/ProfileEditPage';
import RegisterPage from './pages/RegisterPage';
import RecipeDetailsPage from './pages/RecipeDetailsPage';
import Recipes from './components/Recipes';
import './App.css';


const App = () => {
    return (
        <div className="app-container">
        <Router>
            <header>
                    <h1>Vegan Recipes</h1>
                    <nav>
                        <a href="/">Home</a>
                        <a href="/search">Search</a>
                        <a href="/favorites">Favorites</a>
                        <a href="/profile">Profile</a>
                        <a href="/login">Login</a>
                    </nav>
                </header>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/search" component={SearchPage} />
                    <Route path="/results" component={ResultsPage} />
                    <Route path="/favorites" component={FavoritesPage} />
                    <Route path="/profile" exact component={ProfilePage} />
                    <Route path="/profile/edit" component={ProfileEditPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/recipe/:id" component={RecipeDetailsPage} />
                    <Route path="/recipes" component={Recipes} />
                </Switch>
                <footer>
                    <p>&copy; 2024 Vegan Recipes</p>
                </footer>
            </Router>
        </div>
    );
}

export default App;
