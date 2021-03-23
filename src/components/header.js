import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  favoriteButton: {
    marginLeft: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  offset: theme.mixins.toolbar,
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Yet Another Recipe App
          </Typography>
          <IconButton
            edge="start"
            className={classes.favoriteButton}
            color="inherit"
            aria-label="menu"
          >
            <FavoriteIcon />
          </IconButton>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </div>
  );
};

export default Header;
