import icons from 'url:../../img/icons.svg';

/**
 * Parent class with common properties and methods for
 */
export default class View {
  _data;

  /**
   * Render a recipe
   * @param {*} data the recipe data
   */
  render(data) {
    // Save data into class
    this._data = data;

    // Generate markup
    const markup = this._generateMarkup();

    // Clear parent
    this._clear();

    // Insert html from markup
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Clear innerHtml of parent element
   */
  _clear() {
    this._parentElement.innerHTML = '';
  }

  /**
   * Render a spinner while recipe is loading
   */
  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;

    // Clear parent
    this._clear();

    // Render markup
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Render error message
   * @param {*} message given
   */
  renderError(message) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    // Clear parent
    this._clear();

    // Render error
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Render success message
   * @param {*} message given
   */
  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    // Clear parent
    this._clear();

    // Render success message
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
