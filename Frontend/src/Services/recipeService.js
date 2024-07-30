import axios from 'axios';

const API_URL = 'https://api.spoonacular.com/recipes';
const API_KEY = 'd74a060a9a3b426f9689dc4e20d2f1ce';

// function to fetch all vegan recipes
const getAllVeganRecipes = async () => {
    try {
        // GET request to fetch vegan recipes
        const response = await axios.get(`${API_URL}/complexSearch`, {
            params: {
                diet: 'vegan',
                number: 20,
                apiKey: 'd74a060a9a3b426f9689dc4e20d2f1ce',
                includeInstruction: true,
                sort: 'alphabetical'
            }
        });
        return response.data.results;
    }  catch (err) {
        // log errors, throw error to be handled by the calling function
        console.error('Error fetching vegan recipes', err);
        throw err;
    }
};

export default {
    getAllVeganRecipes,
};
