import { Button, makeStyles, Modal } from "@material-ui/core";
import React from "react";
import { useModalState } from "../../../misc/custom-hooks";
import AvatarProfile from "../../AvatarProfile";

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
  profile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  since: {
    fontSize: "0.5em",
    color: "gray",
  },
}));

const ProfileInfoBtnModal = ({ profile, children }) => {
  const classes = useStyles();
  const { isOpen, close, open } = useModalState();
  const { name, avatar, createdAt } = profile;

  const shortName = profile.name.split(" ")[0];

  const memberSince = new Date(createdAt).toLocaleDateString();

  return (
    <>
      <Button onClick={open}>{shortName}</Button>
      <Modal open={isOpen} onClose={close} className={classes.modal}>
        <div className={classes.paper}>
          <h6>{shortName}'s profile</h6>
          <div className={classes.profile}>
            <AvatarProfile src={avatar} name={name} />
          </div>
          <h5>{name}</h5>
          <p className={classes.since}>Member since {memberSince}</p>
          <div className={classes.button}>{children}</div>
          <Button onClick={close}>close</Button>
        </div>
      </Modal>
    </>
  );
};

export default ProfileInfoBtnModal;
