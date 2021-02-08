import { Avatar, makeStyles } from "@material-ui/core";
import React from "react";
import { getNameInitials } from "../misc/helpers";

const useStyles = makeStyles((theme) => ({
  profileAvatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    fontSize: "2em",
  },
}));

const AvatarProfile = ({ name, ...avatarProps }) => {
  const classes = useStyles();
  return (
    <Avatar className={classes.profileAvatar} {...avatarProps}>
      {getNameInitials(name)}
    </Avatar>
  );
};

export default AvatarProfile;
