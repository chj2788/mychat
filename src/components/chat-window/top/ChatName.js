import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";
import ChatTop from "../../chat-window/top";
import { useParams } from "react-router";
import { useRooms } from "../../../context/rooms.context";
import { transformToArr } from "../../../misc/helpers";
import { CurrentRoomProvider } from "../../../context/current-room.context";
import { auth } from "../../../misc/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  messages: {
    width: "100%",
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
    fontSize: "1em",
  },
}));

const ChatName = () => {
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
      <ChatTop />
    </CurrentRoomProvider>
  );
};

export default ChatName;
