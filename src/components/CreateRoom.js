import {
  Button,
  IconButton,
  makeStyles,
  Modal,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { useModalState } from "../misc/custom-hooks";
import firebase from "firebase/app";
import { auth, database } from "../misc/firebase";
import AddIcon from "@material-ui/icons/Add";

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
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 0,
  },
  grid: {
    margin: "0.7em auto",
  },
}));

const CreateRoom = () => {
  const classes = useStyles();
  const { isOpen, open, close } = useModalState();
  const [formName, setFormName] = useState("");
  const [formDes, setFormDes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);

    const newRoomData = {
      name: formName,
      description: formDes,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      admins: {
        [auth.currentUser.uid]: true,
      },
      fcmUsers: {
        [auth.currentUser.uid]: true,
      },
    };
    try {
      await database.ref("rooms").push(newRoomData);
      alert(`${formName} has been created`);
      setIsLoading(false);
      setFormName("");
      setFormDes("");
      close();
    } catch (err) {
      setIsLoading(false);
      alert(err.message);
    }
  };

  const onNameChange = (event) => {
    console.log(event.target.value);
    setFormName(event.target.value);
  };
  const onDesChange = (event) => {
    console.log(event.target.value);
    setFormDes(event.target.value);
  };

  return (
    <div>
      <IconButton className={classes.button} onClick={open}>
        <AddIcon />
      </IconButton>
      <Modal className={classes.modal} open={isOpen} onClose={close}>
        <div className={classes.paper}>
          <h5>New Chat Room</h5>
          <div className={classes.grid}>
            <TextField
              name="name"
              label="Name"
              placeholder="Enter chat room name..."
              variant="outlined"
              fullWidth
              required
              onChange={onNameChange}
              value={formName}
              error={formName === "" ? true : false}
              helperText="This field should not be empty"
            />
          </div>
          <div className={classes.grid}>
            <TextField
              name="description"
              label="Description"
              rows={5}
              placeholder="Enter room description..."
              variant="outlined"
              multiline
              fullWidth
              required
              onChange={onDesChange}
              value={formDes}
              error={formDes === "" ? true : false}
              helperText="This field should not be empty"
            />
          </div>
          <div className={classes.button}>
            <Button
              onClick={onSubmit}
              disabled={
                formDes === ""
                  ? true
                  : false || formName === ""
                  ? true
                  : false || isLoading
              }
            >
              Create new chat room
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateRoom;
