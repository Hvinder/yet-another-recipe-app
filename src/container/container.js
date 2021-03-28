import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Header from "../components/header";
import RecipeDetails from "../components/recipe-details";
import Results from "../components/results";
import ScrollTop from "../components/scroll-to-top";
import Search from "../components/search";
import * as actionCreators from "../store/actions";

const useStyles = makeStyles({
  root: {
    background: "#fff",
    width: window.innerWidth > 768 ? "60%" : "100%",
  },
});

const Container = (props) => {
  const classes = useStyles();
  const home = (
    <div className={classes.root}>
      <Search search={(data) => props.initializeRecipes(data.query)} />
      {props.recipes && props.recipes.results && (
        <Results recipes={props.recipes.results} />
      )}
    </div>
  );
  const bookmarks = (
    <div className={classes.root}>
      <Results recipes={props.fav} />
    </div>
  );
  const scrollToTop = (
    <ScrollTop {...props}>
      <Fab color="secondary" size="small" aria-label="scroll back to top">
        <KeyboardArrowUpIcon />
      </Fab>
    </ScrollTop>
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
      {scrollToTop}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
    fav: state.fav,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    initializeRecipes: (query) =>
      dispatch(actionCreators.initializeRecipes({ query })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
