import View from './View';
import previewView from './previewView';
class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');

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
