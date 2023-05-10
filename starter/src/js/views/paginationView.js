import { PAGINATION_SIZE } from '../config';
import View from './View';
import icons from 'url:../../img/icons.svg';

/**
 * Class to control pagination buttons
 */
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  /**
   * Html markup for next page
   * @param {integer} page number of page to show in button
   * @returns markup for next button
   */
  _generateNextPage(page) {
    return `
    <button data-goto="${page}" class="btn--inline pagination__btn--next">
      <span>Page ${page}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `;
  }

  /**
   * Html markup for prev page
   * @param {integer} page number of page to show in button
   * @returns marup for prev button
   */
  _generatePrevPage(page) {
    return `
    <button data-goto="${page}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${page}</span>
    </button>
    `;
  }

  /**
   * Generates html markup for nex, prev or both buttons based
   * on the numer of total pages
   * @returns markup for prev, next or both buttons
   */
  _generateMarkup() {
    // Total pages
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (this._data.page === 1 && numPages > 1)
      return this._generateNextPage(this._data.page + 1);

    // Page 1, and there are NO other pages
    if (this._data.page === 1 || numPages === 1) return '';

    // Last page
    if (this._data.page === numPages)
      return this._generatePrevPage(this._data.page - 1);

    // Other page
    if (this._data.page < numPages) {
      return `
      ${this._generatePrevPage(this._data.page - 1)}
      ${this._generateNextPage(this._data.page + 1)}
      `;
    }
  }

  /**
   * Event listener por pagination buttons
   * @param {function} handler Handler function for event listener
   */
  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function (event) {
      // Due to event propagation select closest btn to parent element
      const btn = event.target.closest('.btn--inline');

      // If click outside a button (parent)
      if (!btn) return;

      // Get page to go to based on the dataset of the button clicked
      const goToPage = +btn.dataset.goto;

      // Pass the page to the handler function
      handler(goToPage);
    });
  }
}

export default new PaginationView();
