import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Snackbar from "@material-ui/core/Snackbar";
import { deepOrange } from "@material-ui/core/colors";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MuiAlert from "@material-ui/lab/Alert";
import Ingredients from "./ingredients";
import NutritionalInfo from "./nutritional-info";
import * as actionCreators from "../store/actions";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
  },
  image: {
    filter: "brightness(0.5)",
    width: "100%",
    maxHeight: "400px",
  },
  title: {
    fontSize: "24px",
  },
  fixedIcons: {
    position: "absolute",
    zIndex: "10",
    color: "#fff",
    top: "80px",
    width: window.innerWidth > 768 ? "58%" : "95%",
    display: 'flex',
    justifyContent: 'space-between',
    cursor: "pointer",
  },
  recipeNumbers: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: "14px",
    marginRight: "10px",
  },
}));

const RecipeDetails = (props) => {
  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    props.location &&
      props.location.state &&
      !props.recipeDetails &&
      props.fetchRecipeDetails(props.location.state.id);
  }, [props]);

  const classes = useStyles();

  // Guard against opening this route via url
  if (!props.location.state) {
    props.history.push("/");
    return null;
  }

  const handleSnackBarClick = () => {
    setOpenSnackBar(true);
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const snackBar = (
    <Snackbar
      open={openSnackBar}
      autoHideDuration={6000}
      onClose={handleSnackBarClose}
    >
      <Alert onClose={handleSnackBarClose} severity="success">
        Added to Favorite!
      </Alert>
    </Snackbar>
  );

  const isFavAdded = props.fav.some(
    (item) => item.id === props.location.state.id
  );

  const toggleFavHandler = (recipe) => {
    if (!isFavAdded) {
      const updatedFav = [...props.fav, recipe];
      localStorage.setItem("fav", JSON.stringify(updatedFav));
      props.addFav(updatedFav);
      handleSnackBarClick();
    } else {
      const updatedFav = props.fav.filter((item) => item.id !== recipe.id);
      localStorage.setItem("fav", JSON.stringify(updatedFav));
      props.addFav(updatedFav);
    }
  };

  const recipeSteps = (
    <List
      style={{ margin: "10px" }}
      component="nav"
      aria-label="secondary mailbox folders"
    >
      {props.location.state.analyzedInstructions[0].steps.map((step) => {
        return (
          <ListItem button key={step.number}>
            <Typography style={{ display: "flex", alignItems: "flex-start" }}>
              <Avatar className={classes.recipeNumbers}>
                {step.number.toString()}
              </Avatar>{" "}
              {step.step}
            </Typography>
          </ListItem>
        );
      })}
    </List>
  );

  const favIcon = isFavAdded ? (
    <FavoriteIcon onClick={() => toggleFavHandler(props.location.state)} />
  ) : (
    <FavoriteBorderOutlinedIcon
      onClick={() => toggleFavHandler(props.location.state)}
    />
  );

  return (
    <div className={classes.root}>
      <div className={classes.fixedIcons}>
        <ArrowBackIosIcon onClick={() => props.history.goBack()} />
        {favIcon}
      </div>
      <img
        className={classes.image}
        src={props.location.state.image}
        alt={props.location.state.title}
      />
      <p className={classes.title}>{props.location.state.title}</p>{" "}
      <Ingredients
        ingredients={
          (props.recipeDetails && props.recipeDetails.extendedIngredients) ||
          null
        }
      />
      <NutritionalInfo
        nutrition={
          (props.recipeDetails && props.recipeDetails.nutrition) || null
        }
      />
      {recipeSteps}
      {snackBar}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    recipeDetails: state.recipeDetails,
    fav: state.fav,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecipeDetails: (id) =>
      dispatch(actionCreators.fetchRecipeDetails({ id })),
    addFav: (fav) => dispatch(actionCreators.addFav(fav)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
