import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Switch from "@material-ui/core/Switch";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Ingredients = (props) => {
  const [unit, setUnit] = useState(localStorage.getItem("unit") || "us");
  const classes = useStyles();
  return (
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
        {props && props.ingredients ? (
          <Typography
            style={{
              width: "100%",
            }}
          >
            {props.ingredients.map((ing) => {
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
};

export default Ingredients;
