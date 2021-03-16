import { Box, Button, makeStyles, Typography } from "@material-ui/core";
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
import ClearIcon from "@material-ui/icons/Clear";
import clsx from "clsx";

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
    margin: "2em 1em 0 1em",
    padding: "1em",
    borderRadius: "1em",
  },
  msgbox: {
    background: "gray",
    width: "fit-content",
    borderRadius: "1em",
    padding: "0.2em 1em",
    maxWidth: "40em",
    wordWrap: "break-word",
    fontSize: "1.2em",
  },
  mymsgbox: {
    background: theme.palette.success.dark,
  },
  hovered: {
    backgroundColor: "rgba(192,192,192,0.2)",
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
    <>
      <li
        ref={selfRef}
        style={isAuthor ? { textAlign: "right" } : { textAlign: "left" }}
        className={clsx(classes.msg, {
          [classes.hovered]: isHover,
        })}
      >
        {isAuthor && (
          <IconBtnControl
            isVisible={isHover}
            tooltip="Delete this message"
            onClick={() => handleDelete(message.id)}
            icon={<ClearIcon />}
          />
        )}
        {isAuthor && (
          <IconBtnControl
            isVisible={isHover}
            onClick={() => handleLike(message.id)}
            tooltip="Like this message"
            badgeContent={likeCount}
            icon={
              <FavoriteIcon
                style={isLiked ? { color: "red" } : { color: "white" }}
              />
            }
          />
        )}
        {isAuthor && (
          <TimeAgo
            style={{ marginTop: "2em" }}
            className={classes.time}
            datetime={createdAt}
          />
        )}
        {!isAuthor && (
          <PresenceDot uid={author.uid}>
            <AvatarProfile
              className={classes.avatar}
              src={author.avatar}
              name={author.name}
            />
          </PresenceDot>
        )}
        {!isAuthor && (
          <ProfileInfoBtnModal profile={author}>
            {canGrantAdmin && (
              <Button
                style={{
                  backgroundColor: "blue",
                }}
                onClick={() => handleAdmin(author.uid)}
              >
                {isMsgAuthorAdmin
                  ? "Remove admin permission"
                  : "Give admin permission"}
              </Button>
            )}
          </ProfileInfoBtnModal>
        )}
        {!isAuthor && <TimeAgo className={classes.time} datetime={createdAt} />}
        {!isAuthor && (
          <IconBtnControl
            isVisible={isHover}
            onClick={() => handleLike(message.id)}
            tooltip="Like this message"
            badgeContent={likeCount}
            icon={
              <FavoriteIcon
                style={isLiked ? { color: "red" } : { color: "white" }}
              />
            }
          />
        )}
        <Box
          className={clsx(classes.msgbox, {
            [classes.mymsgbox]: isAuthor,
          })}
          style={
            isAuthor
              ? {
                  margin: "0 1em",
                  float: "right",
                }
              : { marginLeft: "2.5em" }
          }
        >
          {text}
        </Box>
      </li>
    </>
  );
};

export default memo(MessageItem);
