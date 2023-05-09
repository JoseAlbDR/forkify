import { API_URL } from './config';
import { getJSON } from './helper';
import { PAGINATION_SIZE } from './config';

/**
 * Save the curren recipe state
 */
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: PAGINATION_SIZE,
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

    // Populate results array with recipes
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

/**
 * Slice search results in PAGINATION_SIZE
 * @param {*} page the page we want to show (default is 1)
 * @returns sublist with PAGINATION_SIZE results
 */
export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;

  // page = 2 => (2 - 1) * 10 = 10 start
  const start = (page - 1) * state.search.resultsPerPage;

  // page = 2 => 2 * 10 = 20 end
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};
