import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CircularProgress from "@material-ui/core/CircularProgress";
import { VictoryPie, VictoryContainer } from "victory";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
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
    height: "75px",
  },
  title: {
    position: "absolute",
    color: "#fff",
    fontSize: "28px",
  },
}));

const RecipeItem = (props) => {
  const [state, setState] = useState(null);
  useEffect(() => {
    props.location &&
      props.location.state &&
      !state &&
      axios
        .get(
          `https://api.spoonacular.com/recipes/${props.location.state.id}/information?includeNutrition=true&apiKey=b99505b93af941dab428e5a08cbb79ec`
        )
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

  const ingredientsInfo = (
    <Accordion style={{ width: "90%", marginTop: "20px" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>Ingredients</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {state && state.extendedIngredients ? (
            state.extendedIngredients.map((ing) => {
              return (
                <i
                  key={ing.id}
                  style={{
                    display: "flex",
                    margin: 0,
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{ing.name}</span>{" "}
                  <span>
                    {ing.measures.metric.amount} {ing.measures.metric.unitShort}
                  </span>
                </i>
              );
            })
          ) : (
            <CircularProgress />
          )}
        </Typography>
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
          left: "10px",
          top: "30px",
        }}
        onClick={() => history.push("/")}
      />
      <img
        className={classes.image}
        src={props.location.state.image}
        alt={props.location.state.title}
      />
      <p className={classes.title}>{props.location.state.title}</p>{" "}
      {ingredientsInfo}
      {recipeSteps}
      {state && state.nutrition && (
        <VictoryPie
          animate={{
            duration: 2000,
          }}
          colorScale={["#9f8bcc", "#b75644", "#7ac781", "#c3b84e"]}
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
      )}
    </div>
  );
};

export default RecipeItem;
