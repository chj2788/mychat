import React, { memo } from "react";
import { Button, makeStyles, Modal, Typography } from "@material-ui/core";
import { useCurrentRoom } from "../../../context/current-room.context";
import EditRoomModal from "./EditRoomModal";
import RoomInfoBtnModal from "./RoomInfoBtnModal";
import { useModalState } from "../../../misc/custom-hooks";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  chatName: {
    textAlign: "center",
    justifyContent: "center",
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
}));

const Top = () => {
  const name = useCurrentRoom((v) => v.name);
  const description = useCurrentRoom((v) => v.description);
  const isAdmin = useCurrentRoom((v) => v.isAdmin);
  const { isOpen, close, open } = useModalState();

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.chatName} onClick={open}>
        {name}
      </Typography>
      {/* <Button className={classes.button} onClick={open}>
        Room Info
      </Button> */}
      <Modal open={isOpen} onClose={close} className={classes.modal}>
        <div className={classes.paper}>
          <h5>About "{name}"</h5>
          <h6>Description: {description}</h6>
          <Button onClick={close}>close</Button>
        </div>
      </Modal>
      {/* <RoomInfoBtnModal /> */}
      <span>{isAdmin && <EditRoomModal />}</span>
    </div>
  );
};

export default memo(Top);
