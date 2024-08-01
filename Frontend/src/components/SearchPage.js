import React, { useState } from 'react';
// import useHistory to programmatically navigate
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../styles/SearchPage.css';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');
    // hook for navigation
    const history = useHistory();

    // function to handle input change
    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };
    
    // function to validate form
    const validateForm = () => {
        if (query.trim() === '') {
            // minimum query length validation
            setError('Search query cannot be empty');
            return false;
        }
        setError('');
        return true;
    };



    // function to handle form submission
    const handleSubmit = async (event) => {
        // prevent default form submission behavior
        event.preventDefault();
        // validate form before proceeding
        if (!validateForm()) return;

        try {
            // call API to perform search
            const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
                params: { 
                    query, 
                    apiKey: 'd74a060a9a3b426f9689dc4e20d2f1ce'
                }
            });

            const results = response.data.results;
            
            // navigate to results page with query
            history.push({
                pathname: '/results',
                state: { query, results }
            });
        } catch (err) {
            console.error('Error performing search', err);
            setError('Failed to perform search');
        }
    };


    return (
        <div className="search-container">
            <h1>Search Recipes</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search Recipes"
                />
                <br />
                <button type="submit">Search</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default SearchPage;
