import axios from "axios";
import {
  recipeSearchEndpoint,
  recipeInfoEndpoint,
} from "../constants/api-constants";

export const INITIALIZE_RECIPES = "INITIALIZE_RECIPES";
export const RECIPES_INITIALIZED = "RECIPES_INITIALIZED";
export const ADD_FAV = "ADD_FAV";
export const FETCH_RECIPE_DETAILS = "FETCH_RECIPE_DETAILS";
export const RECIPE_DETAILS_FETCHED = "RECIPE_DETAILS_FETCHED";

export const recipesInitialized = (payload) => {
  return {
    type: RECIPES_INITIALIZED,
    payload,
  };
};

// Async code with redux-thunk middleware
export const initializeRecipes = (payload) => {
  return (dispatch) => {
    axios
      .get(recipeSearchEndpoint(payload.query))
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("recipes", JSON.stringify(res.data));
        dispatch(recipesInitialized(res.data));
      })
      .catch((err) => console.log(err));
  };
};

export const addFav = (payload) => {
  return {
    type: ADD_FAV,
    payload,
  };
};

export const recipeDetailsFetched = (payload) => {
  return {
    type: RECIPE_DETAILS_FETCHED,
    payload,
  };
};

export const fetchRecipeDetails = (payload) => {
  return (dispatch) => {
    axios
      .get(recipeInfoEndpoint(payload.id))
      .then((res) => {
        console.log(res.data);
        dispatch(recipeDetailsFetched(res.data));
      })
      .catch((err) => console.log(err));
  };
};
