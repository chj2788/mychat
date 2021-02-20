import { Button, makeStyles } from "@material-ui/core";
import React, { memo } from "react";
import TimeAgo from "timeago-react";
import { useCurrentRoom } from "../../../context/current-room.context";
import { auth } from "../../../misc/firebase";
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

const MessageItem = ({ message, handleAdmin }) => {
  const classes = useStyles();
  const { author, createdAt, text } = message;
  const isAdmin = useCurrentRoom((v) => v.isAdmin);
  const admins = useCurrentRoom((v) => v.admins);

  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAdmin = isAdmin && !isAuthor;

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
        <ProfileInfoBtnModal profile={author}>
          {canGrantAdmin && (
            <Button
              style={{ backgroundColor: "blue" }}
              onClick={() => handleAdmin(author.uid)}
            >
              {isMsgAuthorAdmin
                ? "Remove admin permission"
                : "Give admin permission"}
            </Button>
          )}
        </ProfileInfoBtnModal>
        <TimeAgo className={classes.time} datetime={createdAt} />
      </div>
      <div>
        <span>{text}</span>
      </div>
    </li>
  );
};

export default memo(MessageItem);
