import { AppBar, makeStyles, Toolbar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
}));

export default function Header() {
  const classes = useStyles();
  return (
    <>
      <AppBar className={classes.appbar}>
        <Toolbar className={classes.appbarWrapper}>
          <h1 className={classes.appbarTitle}>
            My<span className={classes.colorText}>Chat</span>
          </h1>
        </Toolbar>
      </AppBar>
    </>
  );
}
