import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
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
import { recipeInfoEndpoint } from "../constants/api-constants";
import Ingredients from "./ingredients";
import NutritionalInfo from "./nutritional-info";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: window.innerWidth > 768 ? "60%" : "100%",
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
    top: "70px",
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

const RecipeItem = (props) => {
  const [state, setState] = useState(null);
  const [fav, setfav] = useState(JSON.parse(localStorage.getItem("fav")) || []);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    props.location &&
      props.location.state &&
      !state &&
      axios
        .get(recipeInfoEndpoint(props.location.state.id))
        .then((res) => {
          console.log(res.data);
          setState(res.data);
        })
        .catch((err) => console.log(err));
  }, [state, props.location]);
  const classes = useStyles();
  const history = useHistory();

  // Guard against opening this route via url
  if (!props.location.state) {
    history.push("/");
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

  const isFavAdded = fav.some((item) => item.id === props.location.state.id);

  const toggleFavHandler = (recipe) => {
    if (!isFavAdded) {
      const updatedFav = [...fav, recipe];
      localStorage.setItem("fav", JSON.stringify(updatedFav));
      setfav(updatedFav);
      handleSnackBarClick();
    } else {
      const updatedFav = fav.filter((item) => item.id !== recipe.id);
      localStorage.setItem("fav", JSON.stringify(updatedFav));
      setfav(updatedFav);
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
    <FavoriteIcon
      className={classes.fixedIcons}
      style={{
        right: "20px",
      }}
      onClick={() => toggleFavHandler(props.location.state)}
    />
  ) : (
    <FavoriteBorderOutlinedIcon
      className={classes.fixedIcons}
      style={{
        right: "20px",
      }}
      onClick={() => toggleFavHandler(props.location.state)}
    />
  );

  return (
    <div className={classes.root}>
      <ArrowBackIosIcon
        className={classes.fixedIcons}
        style={{
          left: "20px",
        }}
        onClick={() => history.push("/")}
      />
      {favIcon}
      <img
        className={classes.image}
        src={props.location.state.image}
        alt={props.location.state.title}
      />
      <p className={classes.title}>{props.location.state.title}</p>{" "}
      <Ingredients ingredients={(state && state.extendedIngredients) || null} />
      <NutritionalInfo nutrition={(state && state.nutrition) || null} />
      {recipeSteps}
      {snackBar}
    </div>
  );
};

export default RecipeItem;
