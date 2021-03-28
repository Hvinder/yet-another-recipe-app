import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    minWidth: 300,
    height: 380,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px",
    boxShadow: "0px 2px 5px 0px #868686",
    borderRadius: "20px",
    cursor: "pointer",
    justifyContent: "space-between",
  },
  media: {
    height: 140,
    width: "100%",
    borderRadius: "20px 20px 0 0",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: "2px 5px",
  },
  card: {
    paddingBottom: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
});

const ResultCard = (props) => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={6}
      lg={6}
      className={classes.root}
      key={props.recipe.id}
      style={{ padding: 0 }}
      onClick={() => history.push({ pathname: "/recipe", state: props.recipe })}
    >
      <img
        className={classes.media}
        src={props.recipe.image}
        alt={props.recipe.title}
      />
      <div className={classes.card}>
        <p>{props.recipe.title}</p>
        <div className={classes.chips}>
          {props.recipe.dishTypes.map((dishType, index) => {
            return (
              index < 5 && (
                <Chip
                  className={classes.chip}
                  key={dishType}
                  label={dishType}
                  variant="outlined"
                />
              )
            );
          })}
        </div>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
        >
          <QueryBuilderIcon />
          <br />
          {props.recipe.readyInMinutes}mins
        </Typography>
        <Button size="small" color="secondary">
          View Details
        </Button>
      </div>
    </Grid>
  );
};

export default ResultCard;
