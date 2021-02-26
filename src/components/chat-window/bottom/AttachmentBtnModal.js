import {
  Button,
  IconButton,
  Input,
  makeStyles,
  Modal,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { useModalState } from "../../../misc/custom-hooks";
import { useParams } from "react-router";
import { storage } from "../../../misc/firebase";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: "70%",
    border: "2px solid #000",
    borderRadius: 10,
    fontSize: 30,
    textAlign: "center",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  warning: {
    fontSize: "0.5em",
    color: "gray",
    textAlign: "end",
  },
}));

const MAX_FILE_SIZE = 1000 * 1024 * 5;

const AttachmentBtnModal = ({ afterUpload }) => {
  const classes = useStyles();
  const { chatId } = useParams();
  const { isOpen, close, open } = useModalState();

  const [fileList, setFileList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (fileArr) => {
    const filtered = fileArr
      .filter((el) => el.blobFile.size <= MAX_FILE_SIZE)
      .slice(0, 5);
    setFileList(filtered);
  };

  const onUpload = async () => {
    try {
      const uploadPromises = fileList.map((f) => {
        storage
          .ref("/chat/${chatId}")
          .child(Date.now() + f.name)
          .put(f.blobFile, {
            cacheControl: `public, max-age=${3600 * 24 * 3}`,
          });
      });

      const uploadSnapshots = await Promise.all(uploadPromises);

      const shapePromises = uploadSnapshots.map(async (snap) => {
        return {
          contentType: snap.metadata.contentType,
          name: snap.metadata.name,
          url: await snap.ref.getDownloadURL(),
        };
      });

      const files = await Promise.all(shapePromises);

      await afterUpload(files);
      setIsLoading(false);
      close();
    } catch (err) {
      setIsLoading(false);
      alert(err.message);
    }
  };

  return (
    <>
      <IconButton onClick={open}>
        <AttachFileIcon />
      </IconButton>
      <Modal className={classes.modal} open={isOpen} onClose={close}>
        <div className={classes.paper}>
          <h5>Upload Files</h5>
          <Input type="file" onChange={onChange} disabled={isLoading}></Input>
          <Button disabled={isLoading} onClick={onUpload} fullWidth>
            Send
          </Button>
          <Typography className={classes.warning}>
            *only files less than 5mb are allowed
          </Typography>
        </div>
      </Modal>
    </>
  );
};

export default AttachmentBtnModal;
