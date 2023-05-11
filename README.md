# Forkify

Recipe application with custom recipe upload to remote API.

** WEB PAGE **
Forkify - JADR (https://forkify-jadr.netlify.app)

This project is from a udemy curse.

- https://www.udemy.com/course/the-complete-javascript-course

There are 2 directories in the repository:

- final(https://github.com/JoseAlbDR/forkify/tree/main/final): Contains the final files done by the TEACHER
- starter(https://github.com/JoseAlbDR/forkify/tree/main/starter): Contains the final files done by ME

## Functionallity:

- Search a recipe with a keyword (p.e pizza, avocado, meat, etc...)
- Select a recipe from the list to render
- Selected recipe show info about the recipe as Name, Photo, Servings, Ingredients...
- Change the number of servings and the ingredients with auto increase or decrease acordinglly
- Bookmark a recipe by clicking in the bookmark icon
  - Bookmarked recipes will show in the BOOKMARKS list
  - Bookmarked recipes persist on page reloads (saved in local storage)
  - Select a bookmarked recipe from BOOKMARKS list to render it
- Upload a recipe to the API with the ADD RECIPE button
- In order to Upload a recipe:
  - Publisher must be at least 4 characters long
  - URL must be at least 5 characters long
  - INGREDIENTS have the following format:
    -- "Quantity,Unit,Description" (scv)
- Only the uploader user can see his own recipes (based on API key)
- API URL: "https://forkify-api.herokuapp.com/v2"

## TODO

- Display number of pages between the pagination buttons
- Ability to sort search results by duration or number of ingredients
- Perform ingredient validation in view, before submitting the form
- Improve recipe ingredient input: separate in multiple fields and allow more than 6 ingredients

- Shopping list feature: button on recipe to add ingredients to a list
- Weekly meal planning feature: assign recipes to the next 7 days and show on a weekly calendar
- Get nutrition data on each ingredient from spoonacular API (https:\*spoonacular.com/food-api) and
- calculate total calories of recipe
