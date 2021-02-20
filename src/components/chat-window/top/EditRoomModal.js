import { Button, makeStyles, Modal } from "@material-ui/core";
import React, { memo } from "react";
import { useParams } from "react-router";
import { useCurrentRoom } from "../../../context/current-room.context";
import { useModalState } from "../../../misc/custom-hooks";
import { database } from "../../../misc/firebase";
import EditableInput from "../../EditableInput";

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

const EditRoomModal = () => {
  const { isOpen, open, close } = useModalState();
  const classes = useStyles();
  const { chatId } = useParams();
  const name = useCurrentRoom((v) => v.name);

  const description = useCurrentRoom((v) => v.description);

  const updateData = (key, value) => {
    database
      .ref(`rooms/${chatId}`)
      .child(key)
      .set(value)
      .then(() => {
        alert("Successfully updated");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const onNameSave = (newName) => {
    updateData("name", newName);
  };

  const onDescriptionSave = (newDesc) => {
    updateData("description", newDesc);
  };

  return (
    <div>
      <Button className={classes.button} onClick={open}>
        A
      </Button>
      <Modal open={isOpen} onClose={close} className={classes.modal}>
        <div className={classes.paper}>
          <h5>Edit Room</h5>
          <EditableInput
            initialValue={name}
            onSave={onNameSave}
            label="Name"
            emptyMsg="Name can not be empty"
            labelwidth={48}
          />
          <EditableInput
            multi="true"
            rows={5}
            initialValue={description}
            onSave={onDescriptionSave}
            emptyMsg="Description can not be empty"
            label="Description"
            labelwidth={88}
          />
          <Button onclick={close}>close</Button>
        </div>
      </Modal>
    </div>
  );
};

export default memo(EditRoomModal);
