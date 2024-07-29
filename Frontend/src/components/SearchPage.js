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

    // function to validate search query
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
            const response = await axios.get('https://spoonacular.com/food-api/search', {
                params: { query }
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
        <div>
            <h1>Search Recipes</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Enter search query"
                />
                <button type="submit">Search</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};
    // return (
    //     <div className="container">
    //         <h1>Search Recipes</h1>
    //         {error && <p className="error">{error}</p>}
    //         <form onSubmit={handleSubmit}>
    //             <div>
    //                 <label>Search Query</label>
    //             <input 
    //                 type="text"
    //                 value={query}
    //                 onChange={(e) => setQuery(e.target.value)}
    //             />
    //             </div>
    //             <button type="submit" className="button">Search</button>
    //         </form>
    //     </div>
    // );
};

export default SearchPage;
