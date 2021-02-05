import { Button, Grid, makeStyles } from "@material-ui/core";
import firebase from "firebase/app";
import { auth, database } from "../misc/firebase";
// import { Alert } from "@material-ui/lab";

const useStyles = makeStyles({
  loginButtonFB: {
    backgroundColor: "#3b5998",
    "&:hover": {
      backgroundColor: "#8b9dc3",
    },
    color: "#ffffff",
    borderRadius: "5px",
    padding: "1% 20%",
    margin: "1em auto",
  },
  loginButtonGG: {
    backgroundColor: "#db4437",
    "&:hover": {
      backgroundColor: "#ff7762",
    },
    color: "#ffffff",
    borderRadius: "5px",
    padding: "1% 20%",
    margin: "1em auto",
  },
});

const SignInButtons = () => {
  const classes = useStyles();

  // function logInAlert(message) {
  //   return (
  //     <div>
  //       <Alert severity="success">{message}</Alert>
  //     </div>
  //   );
  // }

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
      <Grid container direction="column">
        <Button
          className={classes.loginButtonFB}
          variant="contained"
          onClick={onFBSignIn}
        >
          Continue with Facebook
        </Button>
        <Button
          className={classes.loginButtonGG}
          variant="contained"
          onClick={onGGSignIn}
        >
          Continue with Google
        </Button>
      </Grid>
    </>
  );
};

export default SignInButtons;
