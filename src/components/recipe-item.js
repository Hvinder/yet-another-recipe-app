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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // marginLeft: '20%',
    // marginRight: '20%',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // maxWidth: 360,
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
          `https://api.spoonacular.com/recipes/${props.location.state.id}/information?includeNutrition=false&apiKey=b99505b93af941dab428e5a08cbb79ec`
        )
        .then((res) => {
          console.log(res.data);
          setState(res.data);
        })
        .catch((err) => console.log(err));
  }, [state, props.location]);
  const classes = useStyles();
  const history = useHistory();
  if (!props.location.state) {
    history.push("/");
    return null;
  }
  return (
    <div className={classes.root}>
      <ArrowBackIosIcon
        style={{
          position: "absolute",
          zIndex: "10",
          color: "#fff",
          left: "10px",
          top: "10px",
        }}
        onClick={() => history.push("/")}
      />
      <img
        className={classes.image}
        src={props.location.state.image}
        alt={props.location.state.title}
      />
      <p className={classes.title}>{props.location.state.title}</p>{" "}
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
              alignItems: "start",
            }}
          >
            {state &&
              state.extendedIngredients &&
              state.extendedIngredients.map((ing) => {
                return (
                  <span key={ing.id} style={{ display: "block", margin: 0 }}>
                    <i>
                      {ing.name}: {ing.amount}
                    </i>
                  </span>
                );
              })}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <div style={{ margin: "10px" }}>
        {/* <p
          dangerouslySetInnerHTML={{ __html: props.location.state.summary }}
        ></p> */}
        <div>
          <List component="nav" aria-label="secondary mailbox folders">
            {props.location.state.analyzedInstructions[0].steps.map((step) => {
              return (
                <ListItem button key={step.number}>
                  <ListItemText primary={step.number + ". " + step.step} />
                </ListItem>
              );
            })}
          </List>
        </div>
      </div>
    </div>
  );
};

export default RecipeItem;
