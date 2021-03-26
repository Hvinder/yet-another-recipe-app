import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      marginTop: "20px",
      width: "60%",
      height: "50px",
    },
  },
  button: {
    width: "30%",
    marginTop: "20px",
    margin: theme.spacing(1),
  },
}));

const Search = (props) => {
  const [state, setState] = useState(null);
  const classes = useStyles();

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
    </form>
  );
};

export default Search;
