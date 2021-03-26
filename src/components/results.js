import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ResultCard from "./result-card";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  },
});

const Results = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Grid
        container
        spacing={3}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        {props &&
          props.recipes &&
          props.recipes.map((recipe) => {
            return <ResultCard key={recipe.id} recipe={recipe} />;
          })}
      </Grid>
    </div>
  );
};

export default Results;
