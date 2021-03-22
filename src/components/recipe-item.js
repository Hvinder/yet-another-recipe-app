import { useHistory } from "react-router-dom";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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
}));

const RecipeItem = (props) => {
  const classes = useStyles();
  const history = useHistory();
  if (!props.location.state) {
    history.push("/");
    return null;
  }
  return (
    <div className={classes.root}>
      <img src={props.location.state.image} alt={props.location.state.title} />
      <p>{props.location.state.title}</p>{" "}
      <p dangerouslySetInnerHTML={{__html: props.location.state.summary}}></p>
      <div>
        <List component="nav" aria-label="secondary mailbox folders">
          {props.location.state.analyzedInstructions[0].steps.map((step) => {
            return (
              <ListItem button key={step.number}>
                <ListItemText primary={step.step} />
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );
};

export default RecipeItem;
