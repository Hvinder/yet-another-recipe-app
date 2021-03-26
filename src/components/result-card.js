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
import Grid from "@material-ui/core/Grid";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 345,
    height: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
  },
  media: {
    height: 140,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: "2px 5px",
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
    >
      <Card
        style={{
          boxShadow: "0px 5px 10px 0px #868686",
          borderRadius: "20px",
          width: "100%",
          height: "100%",
        }}
      >
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.recipe.image}
            title={props.recipe.title}
          />
          <CardContent style={{ paddingBottom: 0 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {props.recipe.title}
            </Typography>
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
              style={{ marginTop: "15px" }}
            >
              <QueryBuilderIcon />
              <br />
              {props.recipe.readyInMinutes}mins
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={{ justifyContent: "center" }}>
          {/* <Button size="small" color="primary">
    Discard
  </Button> */}
          <Button
            size="small"
            color="secondary"
            onClick={() =>
              history.push({ pathname: "/recipe", state: props.recipe })
            }
          >
            View Details
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ResultCard;
