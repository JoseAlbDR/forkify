import icons from 'url:../../img/icons.svg';
import { Fraction } from '../../../node_modules/fractional';
import View from './View';

/**
 * Class for rendering recipes
 */
class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _message = '';

  /**
   * Event listener for load page and haschange
   * @param  {function} callback function for event listener
   */
  addHandlerRender(handler) {
    // For each event passed create an event listener
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  /**
   * Event listener for increase/decrease buttons
   * @param {function} handler Handler function for event listener
   */
  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (event) {
      // Select closest with btn
      const btn = event.target.closest('.btn--tiny');

      // Guard
      if (!btn) return;

      // Get servings from button
      const servings = +btn.dataset.servings;

      // Servings cant be 0 or less
      if (servings <= 0 || servings === 26) return;

      // Callback handler function with updated servings
      handler(servings);
    });
  }

  /**
   * Event listener for bookmark button
   * @param {function} handler Handler function for event listener
   */
  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (event) {
      const btn = event.target.closest('.btn--bookmark');

      if (!btn) return;

      handler();
    });
  }
  /**
   * Generate markup html template to render an recipe
   * @returns markup template
   */
  _generateMarkup() {
    return `
      <figure class="recipe__fig">
        <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            this._data.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            this._data.servings
          }</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button data-servings= ${
              this._data.servings - 1
            } class="btn--tiny btn--decrease-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button data-servings= ${
              this._data.servings + 1
            } class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            this._data.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
  }

  /**
   * Generate a markup html template for ing
   * @param {object} ing ingredient to render
   * @returns markup html template with the ingredient data
   */
  _generateMarkupIngredient(ing) {
    return `
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          ing?.quantity ? new Fraction(ing.quantity).toString() : ''
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>
    `;
  }
}

export default new RecipeView();
