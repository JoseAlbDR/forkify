import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

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

    // Update results view to mark selected search result
    resultView.update(model.getSearchResultPage());

    // Update bookmarks
    bookmarksView.update(model.state.bookmarks);

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

    console.log(query);

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
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

/**
 * Add or remove and render recipe into Bookmarks list
 * Update recipe bookmark icon
 */
const controlAddBookmark = function () {
  // Check if the recipe is alredy bookmarked
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else if (model.state.recipe.bookmarked)
    model.removeBookmark(model.state.recipe.id);

  // Update recipe bookmark icon
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

/**
 * Event handler to render bookmarks on load event (first load page)
 */
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

/**
 * Event handler to get the data from the modal form
 * @param {*} newRecipe data with the submitted form
 */
const controlAddRecipe = async function (newRecipe) {
  try {
    // Show render spinner
    addRecipeView.renderSpinner();

    // Await upload
    await model.uploadRecipe(newRecipe);

    // Render uploaded recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // windows.history.back()

    // Hide form window after 2.5 secs
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);

    console.log(model.state.recipe);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

/**
 * Initialicer
 */
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
