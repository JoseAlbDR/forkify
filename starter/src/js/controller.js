import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';

// Pollyfilling
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// // Parcel hot reload
// if (module.hot) {
//   module.hot.accept();
// }

/**
 * Controler logic to render a recipe
 * @returns
 */
const controlRecipe = async function () {
  try {
    // Save the recipe id
    const id = window.location.hash.slice(1);

    // Guard clause
    if (!id) return;

    // Renderspinner
    recipeView.renderSpinner();

    // Load Recipe
    await model.loadRecipe(id);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Error handling
  } catch (err) {
    console.error(err.message);
    recipeView.renderError(err.message);
  }
};

/**
 * Get search input
 */
const controlSearchResults = async function () {
  try {
    // Loading spinner
    resultView.renderSpinner();

    // Get query from input field
    const query = searchView.getQuery();

    // Guard
    if (!query) return;

    // Await promise with query result
    await model.loadSearchResults(query);

    // Render all results
    resultView.render(model.getSearchResultPage());

    // Render initial pagination buttons
    paginationView.render(model.state.search);

    // Error handling
  } catch (err) {
    console.error(err);
    resultView.renderError(err.message);
  }
};

/**
 * Render recipes given the page to go to
 * @param {*} goToPage page to go to
 */
const controlPagination = function (goToPage) {
  // Render New results
  resultView.render(model.getSearchResultPage(goToPage));

  // Render New pagination buttons
  paginationView.render(model.state.search);
};

/**
 * Update servings and ingredients
 * Render the recipe with updated servings
 * @param {*} servings servings to update to
 */
const controlServings = function (servings) {
  // Update the recipe servings (in state)
  model.updateServings(servings);

  // Update the recipe view
  recipeView.render(model.state.recipe);
};

/**
 * Initialice event handlers
 */
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
};
init();
