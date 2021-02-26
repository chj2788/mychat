import React from "react";
import { usePresence } from "../misc/custom-hooks";
import { Badge, makeStyles, Tooltip, withStyles } from "@material-ui/core";

// const StyledBadge = (colors) =>
//   withStyles((theme) => ({
//     badge: {
//       backgroundColor: colors,
//       color: colors,
//       boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
//       "&::after": {
//         position: "absolute",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         borderRadius: "50%",
//         animation: "$ripple 1.2s infinite ease-in-out",
//         border: "1px solid currentColor",
//         content: '""',
//       },
//     },
//     "@keyframes ripple": {
//       "0%": {
//         transform: "scale(.8)",
//         opacity: 1,
//       },
//       "100%": {
//         transform: "scale(2.4)",
//         opacity: 0,
//       },
//     },
//   }))(Badge);

const PresenceDot = ({ children, uid }) => {
  const presence = usePresence(uid);

  const getColor = (presence) => {
    if (!presence) {
      return "gray";
    }

    switch (presence.state) {
      case "online":
        return "primary";
      case "offline":
        return "error";
      default:
        return "default";
    }
  };

  const getText = (presence) => {
    if (!presence) {
      return "Unknown state";
    }
    return presence.state === "online"
      ? "Online"
      : `Last online ${new Date(presence.last_changed).toLocaleDateString()}`;
  };
  const color = getColor(presence);
  // const GreenBadge = StyledBadge(color);
  // console.log(GreenBadge);

  return (
    <>
      <Tooltip arrow title={getText(presence)} placement="top-start">
        <Badge
          overlap="circle"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          variant="dot"
          color={color}
        >
          {/* <GreenBadge
          overlap="circle"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          variant="dot"
        > */}
          {children}
        </Badge>
        {/* </GreenBadge> */}
      </Tooltip>
    </>
  );
};

export default PresenceDot;
