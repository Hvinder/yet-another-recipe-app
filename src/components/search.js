import React, { useState } from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      // width: "25ch",
      height: "50px",
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const VegSwitch = withStyles({
  switchBase: {
    color: "#048404",
    "&$checked": {
      color: "#d80b0b",
    },
    // "&$checked + $track": {
    //   // backgroundColor: '#ddd',
    // },
  },
  checked: {},
  track: {},
})(Switch);

const Search = (props) => {
  const [state, setState] = useState(null);
  const [isNonVeg, setIsNonVeg] = useState(
    JSON.parse(localStorage.getItem("isNonVeg")) || true
  );

  const classes = useStyles();

  const onVegSwitchHandler = (e) => {
    setIsNonVeg(e.target.checked);
    localStorage.setItem("isNonVeg", JSON.stringify(e.target.checked));
    props.isNonVegToggled(e.target.checked);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        label="RECIPE"
        variant="outlined"
        onChange={(event) => setState(event.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<SearchOutlinedIcon />}
        onClick={() => props.search({ query: state })}
      >
        Search
      </Button>
      <div>
        Veg
        <VegSwitch checked={isNonVeg} onChange={onVegSwitchHandler} />
        Non-Veg
      </div>
    </form>
  );
};

export default Search;
