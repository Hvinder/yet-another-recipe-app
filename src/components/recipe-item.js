import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Switch from "@material-ui/core/Switch";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { VictoryPie, VictoryContainer } from "victory";
import { recipeInfoEndpoint } from "../constants/api-constants";

const useStyles = makeStyles((theme) => ({
  root: {
    width: window.innerWidth > 768 ? "60%" : "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  image: {
    filter: "brightness(0.5)",
    width: "100%",
    maxHeight: "400px",
  },
  title: {
    fontSize: "24px",
  },
}));

const RecipeItem = (props) => {
  const [state, setState] = useState(null);
  const [unit, setUnit] = useState(localStorage.getItem("unit") || "metric");
  const [fav, setfav] = useState(JSON.parse(localStorage.getItem("fav")) || []);
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

  const isFavAdded = fav.some((item) => item.id === props.location.state.id);

  const toggleFavHandler = (recipe) => {
    // debugger;
    if (!isFavAdded) {
      const updatedFav = [...fav, recipe];
      localStorage.setItem("fav", JSON.stringify(updatedFav));
      setfav(updatedFav);
    } else {
      const updatedFav = fav.filter((item) => item.id !== recipe.id);
      localStorage.setItem("fav", JSON.stringify(updatedFav));
      setfav(updatedFav);
    }
  };

  const nutritionalChart = state && state.nutrition && (
    <VictoryPie
      animate={{
        duration: 2000,
      }}
      colorScale={["#9f8bcc", "rgb(199 98 98)", "#7ac781", "#c3b84e"]}
      categories={{ x: Object.keys(state.nutrition.caloricBreakdown) }}
      data={Object.keys(state.nutrition.caloricBreakdown).map((el) => {
        return {
          x: el.replace("percent", "% "),
          y: state.nutrition.caloricBreakdown[el],
        };
      })}
      height={300}
      containerComponent={<VictoryContainer responsive={false} />}
    />
  );

  const ingredientsInfo = (
    <Accordion style={{ width: "90%" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>Ingredients</Typography>
      </AccordionSummary>
      <AccordionDetails
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          Imperial{" "}
          <Switch
            checked={unit === "metric"}
            onChange={() => {
              const newUnit = unit === "metric" ? "us" : "metric";
              localStorage.setItem("unit", newUnit);
              setUnit(newUnit);
            }}
            color="secondary"
            name="checkedB"
            inputProps={{ "aria-label": "primary checkbox" }}
          />{" "}
          Metric
        </div>
        {state && state.extendedIngredients ? (
          <Typography
            style={{
              width: "100%",
            }}
          >
            {state.extendedIngredients.map((ing) => {
              return (
                <i
                  key={ing.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{ing.name}</span>{" "}
                  <span>
                    {ing.measures[unit].amount} {ing.measures[unit].unitShort}
                  </span>
                </i>
              );
            })}
          </Typography>
        ) : (
          <CircularProgress />
        )}
      </AccordionDetails>
    </Accordion>
  );
  const nutritionalInfo = (
    <Accordion style={{ width: "90%" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>Nutrients</Typography>
      </AccordionSummary>
      <AccordionDetails
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {nutritionalChart}
        {state && state.extendedIngredients ? (
          <Typography
            style={{
              width: "100%",
            }}
          >
            {state.nutrition.nutrients.map((nutrient) => {
              return (
                <i
                  key={nutrient.name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{nutrient.name}</span>{" "}
                  <span>
                    {nutrient.amount} {nutrient.unit}
                  </span>
                </i>
              );
            })}
          </Typography>
        ) : (
          <CircularProgress />
        )}
      </AccordionDetails>
    </Accordion>
  );

  const recipeSteps = (
    <List
      style={{ margin: "10px" }}
      component="nav"
      aria-label="secondary mailbox folders"
    >
      {props.location.state.analyzedInstructions[0].steps.map((step) => {
        return (
          <ListItem button key={step.number}>
            <ListItemText primary={step.number + ". " + step.step} />
          </ListItem>
        );
      })}
    </List>
  );

  return (
    <div className={classes.root}>
      <ArrowBackIosIcon
        style={{
          position: "absolute",
          zIndex: "10",
          color: "#fff",
          left: "20px",
          top: "70px",
        }}
        onClick={() => history.push("/")}
      />
      {isFavAdded ? (
        <FavoriteIcon
          style={{
            position: "absolute",
            zIndex: "10",
            color: "#fff",
            right: "20px",
            top: "70px",
            fill: "red",
          }}
          onClick={() => toggleFavHandler(props.location.state)}
        />
      ) : (
        <FavoriteBorderOutlinedIcon
          style={{
            position: "absolute",
            zIndex: "10",
            color: "#fff",
            right: "20px",
            top: "70px",
          }}
          onClick={() => toggleFavHandler(props.location.state)}
        />
      )}
      <img
        className={classes.image}
        src={props.location.state.image}
        alt={props.location.state.title}
      />
      <p className={classes.title}>{props.location.state.title}</p>{" "}
      {ingredientsInfo}
      {nutritionalInfo}
      {recipeSteps}
    </div>
  );
};

export default RecipeItem;
