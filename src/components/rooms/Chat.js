import {
  Backdrop,
  CircularProgress,
  Grid,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import Messages from "../chat-window/messages";
import ChatTop from "../chat-window/top";
import ChatBottom from "../chat-window/bottom";
import { faFileExcel } from "@fortawesome/free-regular-svg-icons";
import { faColumns } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router";
import { useRooms } from "../../context/rooms.context";
import { CurrentRoomProvider } from "../../context/current-room.context";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  messages: {
    width: "300px",
    height: "600px",
    textAlign: "center",
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

  const currentRoomData = {
    name,
    description,
  };

  return (
    <CurrentRoomProvider data={currentRoomData}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item xs={12}>
          <ChatTop />
        </Grid>
        <Grid item xs={12}>
          <div className={classes.messages}>
            <Messages />
          </div>
        </Grid>
        <Grid item xs={12}>
          <ChatBottom />
        </Grid>
      </Grid>
    </CurrentRoomProvider>
  );
};

export default Chat;
