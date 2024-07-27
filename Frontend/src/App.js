import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import './styles/App.css';


const App = () => {
    return (
        <div className="app-container">
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
            <Router>
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
            </Router>
            <footer>
                <p>&copy; 2024 Vegan Recipes</p>
            </footer>
        </div>
    );
}

export default App;
