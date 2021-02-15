import React from "react";
import { makeStyles } from "@material-ui/core";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import { RoomsProvider } from "../context/rooms.context";

const useStyles = makeStyles({
  root: {
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
    <RoomsProvider>
      <div className={classes.root}>
        <div className={classes.header}>
          <ResponsiveDrawer />
        </div>
      </div>
    </RoomsProvider>
  );
};

export default Home;
