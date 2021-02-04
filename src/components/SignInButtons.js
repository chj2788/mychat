import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import firebase from "firebase/app";
import { auth, database } from "../misc/firebase";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles({
  loginButtonFB: {
    backgroundColor: "#3b5998",
    "&:hover": {
      backgroundColor: "#8b9dc3",
    },
    color: "#ffffff",
    borderRadius: 10,
    width: 400,
  },
  loginButtonGG: {
    backgroundColor: "#db4437",
    "&:hover": {
      backgroundColor: "#ff7762",
    },
    color: "#ffffff",
    borderRadius: 10,
    width: 400,
  },
  buttons: {
    margin: "4% auto",
  },
});

const SignInButtons = () => {
  const classes = useStyles();

  function logInAlert(message) {
    return (
      <div>
        <Alert severity="success">{message}</Alert>
      </div>
    );
  }

  const signInWithProvider = async (provider) => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);

      if (additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }
      alert("Signed In!");
      // logInAlert("signed in!");
      // alert("success!");
    } catch (err) {
      // <Alert severity="error">{err.message}</Alert>;
      // <Alert variant="filled" severity="error">
      //   This is an error alert — check it out!
      // </Alert>;
      alert(err.message);
    }
  };

  const onFBSignIn = () => {
    signInWithProvider(new firebase.auth.FacebookAuthProvider());
  };
  const onGGSignIn = () => {
    signInWithProvider(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <>
      <div className={classes.buttons}>
        <Button
          className={classes.loginButtonFB}
          component="block"
          variant="contained"
          onClick={onFBSignIn}
        >
          Continue with Facebook
        </Button>
      </div>
      <div className={classes.buttons}>
        <Button
          className={classes.loginButtonGG}
          component="block"
          variant="contained"
          onClick={onGGSignIn}
        >
          Continue with Google
        </Button>
      </div>
    </>
  );
};

export default SignInButtons;
