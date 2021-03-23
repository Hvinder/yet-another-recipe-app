import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";

import Search from "../components/search";
import Results from "../components/results";
import RecipeItem from "../components/recipe-item";

const Container = () => {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("recipes")) || null
  );
  const [filteredRecipes, setFilteredRecipes] = useState(
    JSON.parse(localStorage.getItem("filteredRecipes")) || null
  );
  const [isNonVeg, setIsNonVeg] = useState(true);
  const searchHandler = (data) => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${data.query}&number=10&apiKey=b99505b93af941dab428e5a08cbb79ec&addRecipeInformation=true`
      )
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("recipes", JSON.stringify(res.data));
        setData(res.data);
        filterData(res.data, isNonVeg);
      })
      .catch((err) => console.log(err));
  };
  const filterData = (resData, isNonVeg) => {
    let rawData = JSON.parse(JSON.stringify(resData.results));
    rawData = rawData.filter((chunk) => chunk.vegetarian === !isNonVeg);
    localStorage.setItem("filteredRecipes", JSON.stringify(rawData));
    setFilteredRecipes(rawData);
  };
  const isNonVegToggled = (isNonVeg) => {
    setIsNonVeg(isNonVeg);
    filterData(data, isNonVeg);
  };

  const Home = (
    <div
      style={{
        background: "#fff",
        width: window.innerWidth > 768 ? "60%" : "100%",
      }}
    >
      <Search search={searchHandler} isNonVegToggled={isNonVegToggled} />
      {filteredRecipes && <Results recipes={filteredRecipes} />}
    </div>
  );
  return (
    <Switch>
      <Route path="/" exact>
        {" "}
        {Home}{" "}
      </Route>
      <Route path="/recipe" component={RecipeItem} />
    </Switch>
  );
};

export default Container;
