import { Button, makeStyles, Modal } from "@material-ui/core";
import React from "react";
import { useCurrentRoom } from "../../../context/current-room.context";
import { useModalState } from "../../../misc/custom-hooks";

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
}));

const RoomInfoBtnModal = () => {
  const classes = useStyles();
  const { isOpen, close, open } = useModalState();

  //should not select object itself
  const description = useCurrentRoom((v) => v.description);
  const name = useCurrentRoom((v) => v.name);

  return (
    <>
      <Button className={classes.button} onClick={open}>
        Room information
      </Button>
      <Modal open={isOpen} onClose={close} className={classes.modal}>
        <div className={classes.paper}>
          <h5>About {name}</h5>
          <h6>Description: {description}</h6>
          <Button onClick={close}>close</Button>
        </div>
      </Modal>
    </>
  );
};

export default RoomInfoBtnModal;
