class SearchView {
  _parentEl = document.querySelector('.search');

  /**
   * Get text from for form input
   * @returns input text
   */
  getQuery() {
    const input = this._parentEl.querySelector('.search__field').value;
    this._clearInput();

    return input;
  }

  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  /**
   * Add event listener to handler
   * @param {*} handler
   */
  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
