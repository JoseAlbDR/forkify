const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// fetch request for a SINGLE recipe with error handling
const showRecipe = async function () {
  try {
    const response = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc8f7'
    );

    const data = await response.json();

    if (!response.ok)
      throw new Error(`Recipe not found: ${data.message} (${response.status})`);

    // My way
    const recipe = ({
      id,
      tittle,
      publisher,
      source_url: sourceUrl,
      image_url: image,
      servings,
      cooking_time: cookingTime,
      ingredients,
    } = data.data);

    // Jonas way
    // let { recipe } = data.data;
    // recipe = {
    //   id: recipe.id,
    //   tittle: recipe.tittle,
    //   publisher: recipe.publisher,
    //   sourceUrl: recipe.source_url,
    //   image: recipe.image_url,
    //   servings: recipe.servings,
    //   cookingTime: recipe.cooking_time,
    //   ingredients: recipe.ingredients,
    // };

    console.log(recipe);
  } catch (err) {
    console.error(err.message);
  }
};

showRecipe();
