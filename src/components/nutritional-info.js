import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { VictoryPie, VictoryContainer } from "victory";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const NutritionalInfo = (props) => {
  const classes = useStyles();
  const nutritionalChart = props && props.nutrition && (
    <VictoryPie
      animate={{
        duration: 2000,
      }}
      colorScale={["#9f8bcc", "rgb(199 98 98)", "#7ac781", "#c3b84e"]}
      categories={{ x: Object.keys(props.nutrition.caloricBreakdown) }}
      data={Object.keys(props.nutrition.caloricBreakdown).map((el) => {
        return {
          x: el.replace("percent", "% "),
          y: props.nutrition.caloricBreakdown[el],
        };
      })}
      height={300}
      containerComponent={<VictoryContainer responsive={false} />}
    />
  );
  return (
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
        {props && props.nutrition && props.nutrition.nutrients ? (
          <>
            {nutritionalChart}
            <Typography
              style={{
                width: "100%",
              }}
            >
              {props.nutrition.nutrients.map((nutrient) => {
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
            </Typography>{" "}
          </>
        ) : (
          <CircularProgress />
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default NutritionalInfo;
