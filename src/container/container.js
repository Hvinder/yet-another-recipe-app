import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Search from "../components/search";
import Results from "../components/results";
import RecipeDetails from "../components/recipe-details";
import Header from "../components/header";
import { recipeSearchEndpoint } from "../constants/api-constants";
import ScrollTop from "../components/scroll-to-top";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useStyles = makeStyles({
  root: {
    background: "#fff",
    width: window.innerWidth > 768 ? "60%" : "100%",
  },
});

const Container = (props) => {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("recipes")) || null
  );
  const searchHandler = (data) => {
    axios
      .get(recipeSearchEndpoint(data.query))
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("recipes", JSON.stringify(res.data));
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const classes = useStyles();
  const home = (
    <div className={classes.root}>
      <Search search={searchHandler} />
      {data && data.results && <Results recipes={data.results} />}
    </div>
  );
  const bookmarks = (
    <div className={classes.root}>
      <Results recipes={JSON.parse(localStorage.getItem("fav"))} />
    </div>
  );
  return (
    <>
      <Header />
      <div id="back-to-top-anchor"></div>
      <Switch>
        <Route path="/" exact>
          {home}
        </Route>
        <Route path="/recipe" component={RecipeDetails} />
        <Route path="/bookmarks">{bookmarks}</Route>
      </Switch>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};

export default Container;
