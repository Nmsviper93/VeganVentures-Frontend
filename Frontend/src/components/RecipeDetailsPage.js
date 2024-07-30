import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../Services/axiosInstance';
import '../styles/RecipeDetailsPage.css'

const RecipeDetailsPage = () => {
    // get recipe ID from URL
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        // fetch recipe details when component details
        const fetchRecipe = async () => {
            try {
                console.log('Fetching recipe with id:', id);
                const response = await axiosInstance.get(`/recipes/${id}`)
                console.log('Fetched recipe data:', response.data);
                setRecipe(response.data)
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };
        fetchRecipe();
    }, [id]);

    if (!recipe) return <div>Loading...</div>;

    return (
        <div className="recipe-container">
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
            <h2>Ingredients</h2>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h2>Instructions</h2>
            <ol>
                {recipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                ))}
            </ol>
        </div>
    );
};

export default RecipeDetailsPage;
