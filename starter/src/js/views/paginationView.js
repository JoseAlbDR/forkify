import { PAGINATION_SIZE } from '../config';
import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

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

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (this._data.page === 1 && numPages > 1)
      return this._generateNextPage(this._data.page + 1);

    // Page 1, and there are NO other pages
    if ((this._data.page === numPages) === 1) return '';

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

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function (event) {
      const btn = event.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
}

export default new PaginationView();
