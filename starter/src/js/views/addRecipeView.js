import View from './View';

/**
 * Class for add recipe modal upload
 */
class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';
  _errorMessage = '`We could not upload the recipe. Please try again later!`';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  // We want to add the event handlers on load
  constructor() {
    super();
    this._addHandlerShowModal();
    this._addHandlerClose();
  }

  /**
   * Toggle hidden class to show or hide modal
   */
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');

    // Render form with generated markup
    this.render();
  }

  /**
   * Event listener to open modal
   */
  _addHandlerShowModal() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  /**
   * Event listener to close modal
   */
  _addHandlerClose() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  /**
   * Event listener to get data from modal form
   * @param {*} handler
   */
  addHandlerUpload(handler) {
    // Parent element is upload button
    this._parentElement.addEventListener('submit', function (event) {
      // Prevent reload from submit
      event.preventDefault();

      // Save form data into an array
      const dataArr = [...new FormData(this)];

      // Convert array into an object
      const data = Object.fromEntries(dataArr);

      // Callback handler function with data
      handler(data);
    });
  }

  /**
   * Generates html markup for nex, prev or both buttons based
   * on the numer of total pages
   * @returns markup for prev, next or both buttons
   */
  _generateMarkup() {
    return `
    <div class="upload__column">
          <h3 class="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input value="" required name="title" type="text" />
          <label>URL</label>
          <input value="" required name="sourceUrl" type="text" />
          <label>Image URL</label>
          <input value="" required name="image" type="text" />
          <label>Publisher</label>
          <input value="" required name="publisher" type="text" />
          <label>Prep time</label>
          <input value="" required name="cookingTime" type="number" />
          <label>Servings</label>
          <input value="" required name="servings" type="number" />
        </div>

        <div class="upload__column">
          <h3 class="upload__heading">Ingredients</h3>
          <label>Ingredient 1</label>
          <input
            value=""
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 2</label>
          <input
            value=""
            type="text"
            name="ingredient-2"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 3</label>
          <input
            value=""
            type="text"
            name="ingredient-3"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 4</label>
          <input
            type="text"
            name="ingredient-4"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 5</label>
          <input
            type="text"
            name="ingredient-5"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 6</label>
          <input
            type="text"
            name="ingredient-6"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
        </div>

        <button class="btn upload__btn">
          <svg>
            <use href="src/img/icons.svg#icon-upload-cloud"></use>
          </svg>
          <span>Upload</span>
        </button>
    
    `;
  }
}

export default new AddRecipeView();
