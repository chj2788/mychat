import React, { memo } from "react";
import {
  Button,
  makeStyles,
  Modal,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { useCurrentRoom } from "../../../context/current-room.context";
import EditRoomModal from "./EditRoomModal";
import { useModalState } from "../../../misc/custom-hooks";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  chatName: {
    textAlign: "center",
    justifyContent: "center",
    cursor: "help",
    flexGrow: 1,
  },
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
  name: {
    color: theme.palette.primary.light,
  },
}));

const ChatTop = () => {
  const name = useCurrentRoom((v) => v.name);
  const description = useCurrentRoom((v) => v.description);
  const isAdmin = useCurrentRoom((v) => v.isAdmin);
  const { isOpen, close, open } = useModalState();

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Tooltip arrow title={"Click to see room info"} placement="bottom">
        <Typography variant="h6" className={classes.chatName} onClick={open}>
          {name}
        </Typography>
      </Tooltip>
      <Modal open={isOpen} onClose={close} className={classes.modal}>
        <div className={classes.paper}>
          <h5 className={classes.name}>{name}</h5>
          <h6>Description: {description}</h6>
          <Button onClick={close}>close</Button>
        </div>
      </Modal>
      <div>{isAdmin && <EditRoomModal />}</div>
    </div>
  );
};

export default memo(ChatTop);
