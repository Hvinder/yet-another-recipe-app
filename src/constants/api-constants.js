const baseUrl = "https://api.spoonacular.com/recipes";
const apiKey = "b99505b93af941dab428e5a08cbb79ec";

export const recipeSearchEndpoint = (query) =>
  `${baseUrl}/complexSearch?query=${query}&addRecipeInformation=true&number=10&apiKey=${apiKey}`;

export const recipeInfoEndpoint = (id) =>
  `${baseUrl}/${id}/information?includeNutrition=true&apiKey=${apiKey}`;
