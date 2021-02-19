import { Avatar, makeStyles } from "@material-ui/core";
import React from "react";
import { getNameInitials } from "../misc/helpers";

const useStyles = makeStyles((theme) => ({
  profileAvatar: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
}));

const AvatarProfile = ({ name, mouseovered, ...avatarProps }) => {
  const classes = useStyles();
  // console.log(onMouseEnter);
  console.log(mouseovered);
  return (
    <Avatar className={classes.profileAvatar} {...avatarProps}>
      {getNameInitials(name)}
      {/* <p id="unorderedList">Hello</p> */}
    </Avatar>
  );
};

export default AvatarProfile;
