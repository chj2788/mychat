import { Button, Divider, makeStyles } from "@material-ui/core";
import React from "react";
import { useProfile } from "../context/profile.context";
import { database } from "../misc/firebase";
import AvatarUpload from "./AvatarUpload";
import EditableInput from "./EditableInput";
import ProviderBlock from "./ProviderBlock";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "70%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    borderRadius: 10,
    padding: theme.spacing(2, 4, 3),
    fontSize: 30,
    textAlign: "center",
  },
  input: {
    width: "40ch",
  },
  setMargin: {
    margin: "1em auto",
  },
}));

const Dashboard = ({ onSignOut }) => {
  const classes = useStyles();
  const { profile } = useProfile();
  const onSave = async (newData) => {
    const NicknameRef = database.ref(`/profiles/${profile.uid}`).child("name");

    try {
      await NicknameRef.set(newData);
      alert("Nickname has been updated");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={classes.paper}>
      <h5>Dashboard</h5>
      <div>
        <p>Hey, {profile.name}</p>
        <ProviderBlock />
        <Divider className={classes.setMargin} />
        <EditableInput
          className={classes.input}
          name="nickname"
          initialValue={profile.name}
          onSave={onSave}
          label={"Nickname"}
        />
        <AvatarUpload />
      </div>
      <Button
        variant="contained"
        className={classes.setMargin}
        color="secondary"
        onClick={onSignOut}
      >
        Sign out
      </Button>
    </div>
  );
};

export default Dashboard;
