import { Badge, Button, Divider, makeStyles } from "@material-ui/core";
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
    margin: "1em auto",
  },
  setMargin: {
    margin: "1.5em auto 1em",
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
        <AvatarUpload />
        <div className={classes.input}>
          <EditableInput
            name="nickname"
            initialValue={profile.name}
            onSave={onSave}
            label={"Nickname"}
          />
        </div>
        <Divider className={classes.setMargin} />
      </div>
      <ProviderBlock />
      <div className={classes.setMargin}>
        <Button variant="contained" color="secondary" onClick={onSignOut}>
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
