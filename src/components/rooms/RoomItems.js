import {
  ListItem,
  ListItemText,
  makeStyles,
  MenuItem,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import TimeAgo from "timeago-react";
import AvatarProfile from "../AvatarProfile";

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

  text: {
    fontSize: "1em",
  },
  name: {
    fontStyle: "italic",
  },
}));

const RoomItems = ({ room }) => {
  const classes = useStyles();

  const { createdAt, name, lastMessage } = room;

  return (
    <div>
      <div className={classes.content}>
        <h3 className={classes.roomname}>{name}</h3>
        <TimeAgo
          className={classes.time}
          datetime={
            lastMessage ? new Date(lastMessage.createdAt) : new Date(createdAt)
          }
        />
      </div>
      {lastMessage ? (
        <>
          <div>
            <AvatarProfile
              src={lastMessage.author.avatar}
              name={lastMessage.author.name}
              className={classes.profile}
            />
          </div>
          <Typography className={classes.name}>
            {lastMessage.author.name}
          </Typography>
          <span>{lastMessage.text}</span>
        </>
      ) : (
        <ListItemText className={classes.text}>No messages yet...</ListItemText>
      )}
    </div>
  );
};

export default RoomItems;
