import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import { RoomsProvider } from "../context/rooms.context";
import Chat from "../components/rooms/Chat";
import { Switch, Route } from "react-router";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#212121",
    display: "flex",
  },
  chat: {
    marginTop: 20,
  },
});

const Home = () => {
  const classes = useStyles();
  return (
    <RoomsProvider>
      <div className={classes.root}>
        <Switch>
          <Route exact path="/chat/:chatId">
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="stretch"
            >
              <Grid item xs={12} md={4} className={classes.drawer}>
                <ResponsiveDrawer />
              </Grid>
              <Grid item xs={12}>
                <Chat />
              </Grid>{" "}
            </Grid>
          </Route>
        </Switch>
      </div>
    </RoomsProvider>
  );
};

export default Home;
