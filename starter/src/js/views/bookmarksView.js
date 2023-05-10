import View from './View';
import previewView from './previewView';

/**
 * Class to control bookmarks
 */
class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');

  /**
   * Load bookmarks on load
   * @param {function} handler Handler function for event listener
   */
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  /**
   * Returns an string with a html markup foreach recipe
   * @returns markup template
   */
  _generateMarkup() {
    return !this._data.length
      ? this._defaultMarkupBookmark()
      : this._data
          .map(bookmark => previewView.render(bookmark, false))
          .join('');
  }

  /**
   * Default markup when there is no bookmarks
   * @returns default markup to show
   */
  _defaultMarkupBookmark() {
    return `
    <div class="message">
      <div>
        <svg>
          <use href="src/img/icons.svg#icon-smile"></use>
        </svg>
      </div>
      <p>
        No bookmarks yet. Find a nice recipe and bookmark it :)
      </p>
    </div>
    
    `;
  }
}

export default new BookmarksView();
