import { Button, Grid, makeStyles, Container } from "@material-ui/core";
import firebase from "firebase/app";
import { auth, database } from "../misc/firebase";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  container: {
    textAlign: "center",
  },
  title: {
    fontSize: "3em",
    color: "#ffffff",
  },
  text: {
    color: "#757575",
    margin: "5% auto",
  },
});

const SignInButtons = () => {
  const classes = useStyles();

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
    } catch (err) {
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
      <Container className={classes.container}>
        <h1 className={classes.title}>
          Welcome to <br />
          MyChat
        </h1>
        <p className={classes.text}>Please log in using user credentials</p>
        <Grid container direction="column">
          <Button
            className={classes.loginButtonFB}
            variant="contained"
            onClick={onFBSignIn}
            fullWidth
          >
            <FontAwesomeIcon
              icon={faFacebookF}
              style={{ margin: "auto 1em" }}
            />
            Continue with Facebook
          </Button>
          <Button
            className={classes.loginButtonGG}
            variant="contained"
            onClick={onGGSignIn}
            fullWidth
          >
            <FontAwesomeIcon icon={faGoogle} style={{ margin: "auto 1em" }} />
            Continue with Google
          </Button>
        </Grid>
      </Container>
    </>
  );
};

export default SignInButtons;
