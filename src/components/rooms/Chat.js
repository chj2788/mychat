import {
  Backdrop,
  CircularProgress,
  Grid,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import Messages from "../chat-window/messages";
import ChatBottom from "../chat-window/bottom";
import { useParams } from "react-router";
import { useRooms } from "../../context/rooms.context";
import { CurrentRoomProvider } from "../../context/current-room.context";
import { transformToArr } from "../../misc/helpers";
import { auth } from "../../misc/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  messages: {
    width: "100%",
    height: "100%",
  },
  bottom: {
    position: "fixed",
    display: "inline-block",
    marginTop: "100%",
    bottom: 0,
    width: "100%",
  },
  notfound: {
    textAlign: "center",
  },
  contentWrapper: {
    width: "85%",
    margin: "auto",
  },
}));

const Chat = () => {
  const classes = useStyles();

  const { chatId } = useParams();

  const rooms = useRooms();

  if (!rooms) {
    return (
      <Backdrop>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  const currentRoom = rooms.find((room) => room.id === chatId);

  if (!currentRoom) {
    return <h6 className={classes.notfound}> Chat {chatId} not found </h6>;
  }

  const { name, description } = currentRoom;

  const admins = transformToArr(currentRoom.admins);
  const isAdmin = admins.includes(auth.currentUser.uid);

  const currentRoomData = {
    name,
    description,
    admins,
    isAdmin,
  };

  return (
    <CurrentRoomProvider data={currentRoomData}>
      <Grid container direction="column">
        <Grid item xs={12}>
          <div className={classes.messages}>
            <Messages />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              margin: "1em 3em",
              position: "-webkit-sticky",
              // position: "sticky",
            }}
          >
            <ChatBottom />
          </div>
        </Grid>
      </Grid>
    </CurrentRoomProvider>
  );
};

export default Chat;
