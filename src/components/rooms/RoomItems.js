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
  roomname: { margin: 0, color: theme.palette.primary.light },
  message: {
    alignItems: "center",
  },
  profile: {
    display: "inline-block",
    height: "1.2em",
    width: "1.2em",
  },
  text: {
    fontSize: "1em",
  },
  name: {
    fontStyle: "italic",
    display: "inline",
  },
}));

const RoomItems = ({ room }) => {
  const classes = useStyles();

  const { createdAt, name, lastMessage } = room;

  return (
    <div>
      <div className={classes.content}>
        <h2 className={classes.roomname}>{name}</h2>
        <TimeAgo
          className={classes.time}
          datetime={
            lastMessage ? new Date(lastMessage.createdAt) : new Date(createdAt)
          }
        />
      </div>
      {lastMessage ? (
        <>
          <AvatarProfile
            src={lastMessage.author.avatar}
            name={lastMessage.author.name}
            className={classes.profile}
          />
          <Typography className={classes.name}>
            {lastMessage.author.name}
          </Typography>
          <div style={{ fontWeight: "bold" }}>{lastMessage.text}</div>
        </>
      ) : (
        <ListItemText className={classes.text}>No messages yet...</ListItemText>
      )}
    </div>
  );
};

export default RoomItems;
