import React from "react";
import { Badge, IconButton, makeStyles, Tooltip } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";

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
    color: "red",
  },
  badge: {
    padding: "0 4px",
  },
}));

const IconBtnControl = () => {
  const classes = useStyles();
  return (
    <>
      <Tooltip
        className={classes.tooltip}
        arrow
        title={"Like this message"}
        placement="top-start"
      >
        <Badge
          className={classes.badge}
          badgeContent={5}
          color="secondary"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <IconButton className={classes.iconbtn} onClick={() => {}}>
            <FavoriteIcon className={classes.heart} />
          </IconButton>
        </Badge>
      </Tooltip>
    </>
  );
};

export default IconBtnControl;
