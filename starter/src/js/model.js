import { API_URL, PAGINATION_SIZE } from './config';
import { AJAX } from './helper';
import { PAGINATION_SIZE, API_KEY } from './config';

/**
 * Object to Save the current recipe state
 */
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: PAGINATION_SIZE,
  },
  bookmarks: [],
};

/**
 * Create a recipe object with app format
 * @param {*} data
 * @returns recipe object
 */
const createRecipeObject = function (data) {
  // Save data into object
  const { recipe } = data.data;

  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

/**
 * Load a recipe from the API given an id
 * @param {*} id of id the recipe to load
 */
export const loadRecipe = async function (id) {
  try {
    // Store data from API
    const data = await AJAX(`${API_URL}/${id}?key=${API_KEY}`);

    // Save data in state
    state.recipe = createRecipeObject(data);

    // Set bookmarked true or false
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
    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);

    // If there are no results throw an error
    if (!data.results) throw new Error('Recipe not found, try another one.');

    // Populate results array with recipes
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
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

/**
 * Load saved bookmarks
 * @returns If localstorage is empty return
 */
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (!storage) return;
  state.bookmarks = JSON.parse(storage);
};
init();

/**
 * Upload given recipe
 * @param {*} newRecipe recipe to upload
 */
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.keys(newRecipe)
      // Check that element is an ingredient
      // and that the same element in the newRecipe array is not empy
      .filter(element => element.includes('ingredient') && newRecipe[element])
      .map(ing => {
        // Map every ingredient filtered destructuring from
        // the newRecipe array where the values are
        const ingArr = newRecipe[ing].trim().split(',');

        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct format :)'
          );

        const [quantity, unit, description] = ingArr;

        // Return an object
        // If there is a quantity convert to a number if not set it to null
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    // Same format to POST recipe
    const uploadRecipe = {
      cooking_time: +newRecipe.cookingTime,
      id: newRecipe.id,
      image_url: newRecipe.image,
      ingredients,
      publisher: newRecipe.publisher,
      servings: +newRecipe.servings,
      source_url: newRecipe.sourceUrl,
      title: newRecipe.title,
    };

    // POST query
    const data = await AJAX(`${API_URL}?key=${API_KEY}`, uploadRecipe);

    // Convert to app object
    state.recipe = createRecipeObject(data);

    // Auto add to bookmark array
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
