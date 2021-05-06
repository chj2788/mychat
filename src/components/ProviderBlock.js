/* eslint-disable */
import { Button, Chip, Grid } from "@material-ui/core";
import React, { useState } from "react";
import firebase from "firebase/app";
import { auth } from "../misc/firebase";
import FacebookIcon from "@material-ui/icons/Facebook";
import GTranslateIcon from "@material-ui/icons/GTranslate";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProviderBlock = () => {
  const [isConnected, setIsConnected] = useState({
    "google.com": auth.currentUser.providerData.some(
      (data) => data.providerId === "google.com"
    ),
    "facebook.com": auth.currentUser.providerData.some(
      (data) => data.providerId === "facebook.com"
    ),
  });

  const updateIsConnected = (providerId, value) => {
    setIsConnected((p) => {
      return {
        ...p,
        [providerId]: value,
      };
    });
  };

  const unlink = async (providerId) => {
    try {
      if (auth.currentUser.providerData.length === 1) {
        throw new Error(`You cannot disconnect from ${providerId}`);
      }

      await auth.currentUser.unlink(providerId);

      updateIsConnected(providerId, false);

      alert(`Disconnected from ${providerId}`);
    } catch (err) {
      alert(err.message);
    }
  };

  const unlinkFacebook = () => {
    unlink("facebook.com");
  };
  const unlinkGoogle = () => {
    unlink("google.com");
  };

  const link = async (provider) => {
    try {
      await auth.currentUser.linkWithPopup(provider);

      alert(`Linked to ${provider.providerId}`);
      updateIsConnected(provider.providerId, true);
    } catch (err) {
      alert(err.message);
    }
  };

  const linkFacebook = () => {
    link(new firebase.auth.FacebookAuthProvider());
  };
  const linkGoogle = () => {
    link(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <div>
      {isConnected["facebook.com"] && (
        <Chip
          color="primary"
          label="Connected"
          icon={<FacebookIcon />}
          onDelete={unlinkFacebook}
        />
      )}
      {isConnected["google.com"] && (
        <Chip
          color="secondary"
          label="Connected"
          icon={
            <FontAwesomeIcon icon={faGoogle} style={{ margin: "auto 1em" }} />
          }
          onDelete={unlinkGoogle}
        />
      )}
      <div>
        <Grid container direction="column" justify="center" alignItems="center">
          {!isConnected["facebook.com"] && (
            <Button color="primary" onClick={linkFacebook}>
              <FacebookIcon /> Link to Facebook
            </Button>
          )}
          {!isConnected["google.com"] && (
            <Button color="secondary" onClick={linkGoogle}>
              <FontAwesomeIcon icon={faGoogle} style={{ margin: "auto 1em" }} />{" "}
              Link to Google
            </Button>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default ProviderBlock;
