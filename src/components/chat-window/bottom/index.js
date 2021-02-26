import { IconButton, InputAdornment, OutlinedInput } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import React, { useState } from "react";
import firebase from "firebase/app";
import { useProfile } from "../../../context/profile.context";
import { useParams } from "react-router";
import { database } from "../../../misc/firebase";

function assenbleMessage(profile, chatId) {
  return {
    roomId: chatId,
    author: {
      name: profile.name,
      uid: profile.uid,
      createdAt: profile.createdAt,
      ...(profile.avatar ? { avatar: profile.avatar } : {}),
    },
    createdAt: firebase.database.ServerValue.TIMESTAMP,
  };
}

const Bottom = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { profile } = useProfile();
  const { chatId } = useParams();

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onSendClick = async () => {
    if (input.trim() === "") {
      return;
    }

    const msgData = assenbleMessage(profile, chatId);
    msgData.text = input;

    const updates = {};

    const messageId = database.ref("messages").push().key;

    updates[`/messages/${messageId}`] = msgData;
    updates[`/rooms/${chatId}/lastMessage`] = {
      ...msgData,
      msgId: messageId,
    };

    setIsLoading(true);

    try {
      await database.ref().update(updates);
      setInput("");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      alert(err.message);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onSendClick();
    }
  };

  return (
    <>
      <OutlinedInput
        fullWidth
        placeholder="Write a new message here..."
        value={input}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={onSendClick} disabled={isLoading}>
              <SendIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </>
  );
};

export default Bottom;
