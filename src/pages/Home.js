import React from "react";
import { makeStyles } from "@material-ui/core";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import { RoomsProvider } from "../context/rooms.context";
import Chat from "../components/rooms/Chat";

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
        {/* <Switch>
          <Route exact path="/chat/:chatId">
            <Chat />
          </Route>
        </Switch> */}
      </div>
    </RoomsProvider>
  );
};

export default Home;
