import icons from 'url:../../img/icons.svg';

/**
 * Parent class with common properties and methods for all views
 */
export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data Data to be rendered
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns
   */
  render(data, render = true) {
    // Save data into class
    this._data = data;

    // Generate markup
    const markup = this._generateMarkup();

    if (!render) return markup;

    // Clear parent
    this._clear();

    // Insert html from markup
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Update the DOM only where the text or attributes changes
   * @param {Object | Object[]} data Data to be updated
   */
  update(data) {
    this._data = data;

    // Generate markup with the new data (after click + or - button)
    const newMarkup = this._generateMarkup();

    // Convert newMarkup to a DOM element
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    // Save new DOM nodes into an array
    const newElements = Array.from(newDOM.querySelectorAll('*'));

    // Save current DOM nodes into an array
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    // Loop for each new element
    newElements.forEach((newEl, i) => {
      // Save the current element
      const curEl = curElements[i];

      // Updates changed TEXT (quantities)
      // Check that newEl and curEl are different
      if (
        !newEl.isEqualNode(curEl) &&
        // Text value not empty
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // Save the TEXT
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUTES (dataset)
      if (!newEl.isEqualNode(curEl)) {
        // For each attribute in newEl != to curEl
        Array.from(newEl.attributes).forEach(attr =>
          // Set curEl attribute to newEl attribute
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
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
   * @param {String} message message given
   */
  renderError(message = this._errorMessage) {
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
   * @param {String} message message given
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
