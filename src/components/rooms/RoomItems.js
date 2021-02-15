import {
  ListItem,
  ListItemText,
  makeStyles,
  MenuItem,
} from "@material-ui/core";
import React, { useState } from "react";
import TimeAgo from "timeago-react";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    // padding: theme.spacing(3),
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  time: {
    fontSize: "0.9em",
    color: "gray",
  },
  roomname: { margin: 0 },
  message: {
    alignItems: "center",
  },
  button: {
    display: "block",
    color: "white",
    padding: "1em",
  },
  text: {
    fontSize: "1em",
  },
}));

const RoomItems = ({ room, key, currentKey }) => {
  const classes = useStyles();

  const { createdAt, name } = room;

  return (
    <div>
      <MenuItem className={classes.button} button selected={key === currentKey}>
        <div className={classes.content}>
          <h3 className={classes.roomname}>{name}</h3>
          <TimeAgo className={classes.time} datetime={new Date(createdAt)} />
        </div>
        <ListItemText className={classes.text}>No messages yet...</ListItemText>
      </MenuItem>
    </div>
  );
};

export default RoomItems;
