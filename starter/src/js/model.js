import { API_URL } from './config';
import { getJSON } from './helper';

/**
 * Save the curren recipe state
 */
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

/**
 * Load a recipe from the API given an id
 * @param {*} id of id the recipe to load
 */
export const loadRecipe = async function (id) {
  try {
    // Store data from API
    const data = await getJSON(`${API_URL}/${id}`);

    // Save data into object
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    // Error propagation
  } catch (err) {
    throw err;
  }
};

/**
 * API call to get all recipes that match query
 * @param {*} query keyword to search
 */
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    // API call
    const data = await getJSON(`${API_URL}?search=${query}`);

    // If there are no results throw an error
    if (!data.results) throw new Error('Recipe not found, try another one.');

    // Populate results array with results
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });

    // Error propagation
  } catch (err) {
    throw err;
  }
};
