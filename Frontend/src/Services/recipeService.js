import axios from 'axios';

const API_URL = 'https://spoonacular.com/food-api';

// function to fetch all recipes by ID
const getAllRecipes = async () => {
    try {
        // GET request to fetch all recipes
        const response = await axios.get(`${API_URL}/recipes`);
        return response.data;
    }  catch (err) {
        // log errors, throw error to be handled by the calling function
        console.error('Error fetching recipe details', err);
        throw err;
    }
};

// function to fetch recipe by ID
const getRecipeById = async (id) => {
    try {
        // GET request to fetch recipe details by ID
        const response = await axios.get(`${API_URL}/recipes/${id}`); 
            return response.data;
    } catch (err) {
        console.error('Error searching recipes', err);
        throw err;
    }
};

export default {
    getAllRecipes,
    getRecipeById
};
