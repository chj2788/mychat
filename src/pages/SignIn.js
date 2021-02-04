import React from "react";
import { makeStyles } from "@material-ui/core";
import Header from "../components/Header";

// import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome;";

const useStyles = makeStyles({
  root: {
    fontFamily: "Lora",
    backgroundColor: "#212121",
    backgroundSize: "cover",
  },
});

const SignIn = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
    </div>
  );
};

export default SignIn;
