import {
  Backdrop,
  CircularProgress,
  List,
  ListItem,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useRooms } from "../../context/rooms.context";
import RoomItems from "./RoomItems";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  navlink: {
    display: "block",
    padding: 0,
  },
}));

const ChatRoomList = () => {
  const classes = useStyles();

  const rooms = useRooms();
  const location = useLocation();

  return (
    <List component="nav">
      {!rooms && (
        <Backdrop>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {rooms &&
        rooms.length > 0 &&
        rooms.map((room) => (
          <ListItem
            className={classes.navlink}
            component={NavLink}
            to={`/chats/${room.id}`}
            key={room.id}
          >
            <RoomItems room={room} key={room.id} currentKey={room.id} />
          </ListItem>
        ))}
    </List>
  );
};

export default ChatRoomList;
