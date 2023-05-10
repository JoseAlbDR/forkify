import { API_URL, PAGINATION_SIZE } from './config';
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
    resultsPerPage: 12,
  },
  bookmarks: [],
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

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

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
    // Save current query
    state.search.query = query;

    // Set default page to 1 in each search
    state.search.page = 1;

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
  // Update the page
  state.search.page = page;

  // page = 2 => (2 - 1) * 10 = 10 start
  const start = (page - 1) * state.search.resultsPerPage;

  // page = 2 => 2 * 10 = 20 end
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

/**
 * For each ingredient update the quantity
 * Update the servings of the recipe
 * @param {*} newServings new servings quantity
 */
export const updateServings = function (newServings) {
  // foreach ingredient update the quantity
  state.recipe.ingredients.forEach(ing => {
    // newQt = oldQt * newServings / oldServings
    ing.quantity *= newServings / state.recipe.servings;
  });

  // Update the servings
  state.recipe.servings = newServings;
};

/**
 * Save the bookmarks array into local storage
 */
const saveBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

/**
 * Add a bookmark to the recipe
 * @param {*} recipe
 */
export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  // Update bookmarks
  saveBookmarks();
};

/**
 * Remove bookmark from given recipe id
 * @param {*} id
 */
export const removeBookmark = function (id) {
  // Find id in bookmarks array
  const index = state.bookmarks.findIndex(el => el.id === id);

  // Delete that bookmarked recipe
  state.bookmarks.splice(index, 1);

  // Update bookmarks
  saveBookmarks();

  // Set bookmarked propertie to false
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (!storage) return;
  state.bookmarks = JSON.parse(storage);
};

init();
console.log(state.bookmarks);
