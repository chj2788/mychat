import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import { RoomsProvider } from "../context/rooms.context";
import Chat from "../components/rooms/Chat";
import { Switch, Route, useRouteMatch } from "react-router";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#212121",
    display: "flex",
  },
});

const Home = () => {
  const classes = useStyles();
  return (
    <RoomsProvider>
      <div className={classes.root}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="stretch"
        >
          <Switch>
            <Route exact path="/chat/:chatId">
              <Grid item xs={12} className={classes.drawer}>
                <ResponsiveDrawer />
              </Grid>
            </Route>
            <Route>
              <Grid item xs={12} className={classes.drawer}>
                <ResponsiveDrawer />
              </Grid>
              <Grid item xs={12}>
                <h6>Please select chat</h6>
              </Grid>
            </Route>
          </Switch>
        </Grid>
      </div>
    </RoomsProvider>
  );
};

export default Home;
