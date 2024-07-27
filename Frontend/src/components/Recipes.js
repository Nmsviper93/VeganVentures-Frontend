import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(`${apiUrl}/recipes`);
                setRecipes(response.data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, [apiUrl]);

    return (
        <div>
            <h1>Recipes</h1>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe._id}>{recipe.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Recipes;
