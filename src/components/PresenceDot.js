import React from "react";
import { usePresence } from "../misc/custom-hooks";
import { Badge, Tooltip } from "@material-ui/core";

const PresenceDot = ({ children, uid }) => {
  const presence = usePresence(uid);

  const getColor = (presence) => {
    if (!presence) {
      return "secondary";
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
          {children}
        </Badge>
      </Tooltip>
    </>
  );
};

export default PresenceDot;
