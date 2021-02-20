import { makeStyles } from "@material-ui/core";
import React from "react";
import TimeAgo from "timeago-react";
import AvatarProfile from "../../AvatarProfile";
import PresenceDot from "../../PresenceDot";
import ProfileInfoBtnModal from "./ProfileInfoBtnModal";

const useStyles = makeStyles((theme) => ({
  avatar: {},
  time: {
    fontSize: "0.9em",
    color: "gray",
  },
}));

const MessageItem = ({ message }) => {
  const classes = useStyles();
  const { author, createdAt, text } = message;
  return (
    <li>
      <div>
        <PresenceDot uid={author.uid}>
          <AvatarProfile
            className={classes.avatar}
            src={author.avatar}
            name={author.name}
          />
        </PresenceDot>
        <ProfileInfoBtnModal profile={author} />
        <TimeAgo className={classes.time} datetime={createdAt} />
      </div>
      <div>
        <span>{text}</span>
      </div>
    </li>
  );
};

export default MessageItem;
