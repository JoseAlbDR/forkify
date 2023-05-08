import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';

// Pollyfilling
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// Parcel hot reload
if (module.hot) {
  module.hot.accept();
}

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

    // Loading spinner
    recipeView.renderSpinner();

    // Loading Recipe
    await model.loadRecipe(id);

    // Rendering recipe
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
    resultView.render(model.state.search.results);

    // Error handling
  } catch (err) {
    console.error(err);
    resultView.renderError(err.message);
  }
};

/**
 * Initialice event handlers
 */
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
