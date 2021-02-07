import React from "react";
import { makeStyles } from "@material-ui/core";
import Header from "../components/Header";
import SignInButtons from "../components/SignInButtons";

// import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome;";

const useStyles = makeStyles({
  root: {
    fontFamily: "Lora",
    backgroundColor: "#212121",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: "100vh",
  },
});

const SignIn = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Header />
        <SignInButtons />
      </div>
    </div>
  );
};

export default SignIn;
