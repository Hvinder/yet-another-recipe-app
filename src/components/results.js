import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
  },
  root: {
    maxWidth: 345,
    minWidth: 345,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  media: {
    height: 140,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: 'space-between'
  },
  chip: {
    margin: "2px 5px",
  },
});

const Results = (props) => {
  const history = useHistory();
  const classes = useStyles();
  return (
    props.recipes &&
    props.recipes.map((recipe) => {
      return (
        <div className={classes.container} key={recipe.id}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={recipe.image}
                title={recipe.title}
              />
              <CardContent style={{paddingBottom: 0}}>
                <Typography gutterBottom variant="h5" component="h2">
                  {recipe.title}
                </Typography>
                <div className={classes.chips}>
                  {recipe.dishTypes.map((dishType) => {
                    return (
                      <Chip
                        className={classes.chip}
                        key={dishType}
                        label={dishType}
                        variant="outlined"
                      />
                    );
                  })}
                </div>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ marginTop: "15px" }}
                >
                  <QueryBuilderIcon />
                  <br />
                  {recipe.readyInMinutes}mins
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              {/* <Button size="small" color="primary">
                Discard
              </Button> */}
              <Button
                size="small"
                color="primary"
                onClick={() =>
                  history.push({ pathname: "/recipe", state: recipe })
                }
              >
                View Details
              </Button>
            </CardActions>
          </Card>
        </div>
      );
    })
  );
};

export default Results;
