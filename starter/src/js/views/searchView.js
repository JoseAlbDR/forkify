/**
 * Class for search input
 */
class SearchView {
  _parentEl = document.querySelector('.search');
  _errorMessage = `We could not find that recipe. Please try another one!`;

  /**
   * Get text from form input
   * @returns input text
   */
  getQuery() {
    const input = this._parentEl.querySelector('.search__field').value;
    this._clearInput();

    if (!input) throw new Error('Try to search something ;)');

    return input;
  }

  /**
   * Clear search input
   */
  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  /**
   * Add event listener to handler
   * @param {function} handler Handler function for event listener
   */
  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
