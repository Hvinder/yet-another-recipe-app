import * as actionTypes from "./actions";

const initialState = {
  recipes: JSON.parse(localStorage.getItem("recipes")) || null,
  fav: JSON.parse(localStorage.getItem("fav")) || [],
  recipeDetails: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RECIPES_INITIALIZED:
      const updatedState = JSON.parse(JSON.stringify(state));
      return { ...updatedState, recipes: action.payload };
    case actionTypes.ADD_FAV:
      return { ...state, fav: action.payload };
    case actionTypes.RECIPE_DETAILS_FETCHED:
      return { ...state, recipeDetails: action.payload };
    default:
      return state;
  }
};

export default reducer;
