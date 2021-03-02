import React from "react";
import { Badge, IconButton, makeStyles, Tooltip } from "@material-ui/core";

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

const IconBtnControl = ({
  onClick,
  badgeContent,
  tooltip,
  icon,
  isVisible = true,
}) => {
  const classes = useStyles();
  return (
    <span
      style={isVisible ? { visibility: "visible" } : { visibility: "hidden" }}
    >
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
            {icon}
          </IconButton>
        </Badge>
      </Tooltip>
    </span>
  );
};

export default IconBtnControl;
