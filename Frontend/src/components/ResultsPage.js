import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/ResultsPage.css';

const ResultsPage = () => {
    // use useLocation to access state passed via router
    const location = useLocation();
    const { query, results } = location.state || { query: '', results: [] };

    return ( 
        <div className="results-container">
            <h1>Search Results for "{query}"</h1>
                <ul>
                    {recipes.map((result) => (
                        <li key={result._id}>{result.name}</li>
                    ))}
                </ul>
        </div>
    );
};

export default ResultsPage;
