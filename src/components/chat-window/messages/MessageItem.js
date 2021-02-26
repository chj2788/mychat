import { Button, makeStyles } from "@material-ui/core";
import React, { memo } from "react";
import TimeAgo from "timeago-react";
import { useCurrentRoom } from "../../../context/current-room.context";
import { useHover } from "../../../misc/custom-hooks";
import { auth } from "../../../misc/firebase";
import AvatarProfile from "../../AvatarProfile";
import PresenceDot from "../../PresenceDot";
import ProfileInfoBtnModal from "./ProfileInfoBtnModal";
import IconBtnControl from "./IconBtnControl";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  avatar: { display: "inline-block" },
  time: {
    fontSize: "0.9em",
    color: "gray",
  },
  iconbtn: {
    padding: 0,
  },
  msg: {
    justifyContent: "flex-start",
    position: "static",
  },
}));

const MessageItem = ({ message, handleAdmin, handleLike, handleDelete }) => {
  const classes = useStyles();
  const { author, createdAt, text, likes, likeCount } = message;
  const [selfRef, isHover] = useHover();
  const isAdmin = useCurrentRoom((v) => v.isAdmin);
  const admins = useCurrentRoom((v) => v.admins);

  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAdmin = isAdmin && !isAuthor;

  const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);

  return (
    <li
      ref={selfRef}
      style={isHover ? { backgroundColor: "rgba(192,192,192,0.2)" } : {}}
      className={classes.msg}
    >
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

      <IconBtnControl
        isLiked={isLiked}
        isvisible={isHover}
        onClick={() => handleLike(message.id)}
        tooltip="Like this message"
        badgeContent={likeCount}
        icon={
          <FavoriteIcon
            // className={classes.heart}
            style={{ color: { isLiked } ? "red" : "white" }}
          />
        }
      />

      {isAuthor && (
        <IconBtnControl
          isvisible={isHover}
          tooltip="Delete this message"
          onClick={() => handleDelete(message.id)}
          icon={<DeleteIcon />}
        />
      )}

      <div>
        <span>{text}</span>
      </div>
    </li>
  );
};

export default memo(MessageItem);
