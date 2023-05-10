import View from './View';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView';

/**
 * Class for Results when a search is success
 */
class ResultView extends View {
  _parentElement = document.querySelector('.results');

  /**
   * Returns an string with a html markup foreach recipe
   * @returns markup template
   */
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultView();
