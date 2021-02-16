import {
  Backdrop,
  CircularProgress,
  List,
  ListItem,
  makeStyles,
  MenuItem,
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
  button: {
    display: "block",
    color: "white",
    padding: "1em",
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
            to={`/chat/${room.id}`}
            key={room.id}
          >
            <MenuItem
              className={classes.button}
              button
              selected={`/chat/${room.id}` === location.pathname}
            >
              <RoomItems room={room} />
            </MenuItem>
          </ListItem>
        ))}
    </List>
  );
};

export default ChatRoomList;
