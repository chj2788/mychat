import React from "react";
import { Badge, IconButton, makeStyles, Tooltip } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Fragment } from "react";

const useStyles = makeStyles((theme) => ({
  time: {
    fontSize: "0.9em",
    color: "gray",
  },
  iconbtn: {
    padding: 0,
  },
  heart: {
    fontSize: "1em",
    "&:hover": {
      backGroundcolor: "#e57373",
    },
  },
  badge: {
    padding: "0 4px",
  },
}));

const IconBtnControl = ({ onClick, badgeContent, tooltip, icon }) => {
  const classes = useStyles();
  return (
    <>
      <Tooltip
        className={classes.tooltip}
        arrow
        title={tooltip}
        placement="top-start"
      >
        <Badge
          className={classes.badge}
          badgeContent={badgeContent}
          color="secondary"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <IconButton className={classes.iconbtn} onClick={onClick}>
            {/* <FavoriteIcon
              // className={classes.heart}
              style={{ color: { isLiked } ? "red" : "white" }}
            /> */}
            {icon}
          </IconButton>
        </Badge>
      </Tooltip>
    </>
  );
};

export default IconBtnControl;
