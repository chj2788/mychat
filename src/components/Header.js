import { AppBar, makeStyles, Toolbar } from "@material-ui/core";
import SignInButtons from "./SignInButtons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: "100vh",
    fontFamily: "Lora",
  },
  appbar: {
    background: "none",
    fontFamily: "Galada",
  },
  appbarWrapper: {
    width: "85%",
    margin: "auto",
  },
  appbarTitle: {
    flexGrow: "1",
  },
  colorText: {
    color: "#42a5f4",
  },
  container: {
    textAlign: "center",
  },
  title: {
    fontSize: "40px",
    color: "#ffffff",
  },
  text: {
    color: "#757575",
    margin: "5% auto",
  },
}));

export default function Header() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar}>
        <Toolbar className={classes.appbarWrapper}>
          <h1 className={classes.appbarTitle}>
            My<span className={classes.colorText}>Chat</span>
          </h1>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        <h1 className={classes.title}>
          Welcome to <br />
          MyChat
        </h1>
        <p className={classes.text}>Please log in using user credentials</p>
        <SignInButtons />
      </div>
    </div>
  );
}
