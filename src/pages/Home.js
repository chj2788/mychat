import React from "react";
import { makeStyles } from "@material-ui/core";
import ResponsiveDrawer from "../components/ResponsiveDrawer";

const useStyles = makeStyles({
  root: {
    fontFamily: "Lora",
    backgroundColor: "#212121",
    display: "flex",
  },
  header: {
    display: "flex",
    textAlign: "center",
  },
});

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <ResponsiveDrawer />
      </div>
    </div>
  );
};

export default Home;
