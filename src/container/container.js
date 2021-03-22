import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";

import Search from "../components/search";
import Results from "../components/results";
import RecipeItem from "../components/recipe-item";

const Container = () => {
  const [state, setState] = useState({ query: null, isNonVeg: true });
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("recipes")) || null
  );
  const searchHandler = (data) => {
    setState({ ...state, query: data.query, isNonVeg: data.isNonVeg });
    let dietType = "";
    if (!data.isNonVeg) {
      dietType = "&diet=Vegetarian";
    }
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${data.query}&number=2&apiKey=b99505b93af941dab428e5a08cbb79ec&addRecipeInformation=true${dietType}`
      )
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("recipes", JSON.stringify(res.data));
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const Home = (
    <>
      <Search search={searchHandler} />
      {data && data.results && <Results recipes={data.results} />}
    </>
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
