import { Button, makeStyles, Modal } from "@material-ui/core";
import React, { useState, useRef } from "react";
import { useModalState } from "../misc/custom-hooks";
import AvatarEditor from "react-avatar-editor";
import { useProfile } from "../context/profile.context";
import { database, storage } from "../misc/firebase";
import AvatarProfile from "./AvatarProfile";

const useStyles = makeStyles((theme) => ({
  chip: {
    cursor: "pointer",
    padding: "0.4em 0.9em",
    fontSize: "0.5em",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "gray",
      color: "white",
    },
  },
  input: { display: "none" },
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
    margin: "1em 0 0 0",
  },
  profileAvatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}));

const fileInputTypes = ".png, .jpeg, .jpg";

const acceptedFileTypes = ["image/png", "image/jpeg", "image/pjpeg"];

const isValid = (file) => acceptedFileTypes.includes(file.type);

const getBlob = (canvas) => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("File process error"));
      }
    });
  });
};

const AvatarUpload = () => {
  const classes = useStyles();

  const { isOpen, open, close } = useModalState();
  const { profile } = useProfile();
  const [img, setImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const avatarEditorRef = useRef();

  const onFileInputChange = (ev) => {
    const currentFiles = ev.target.files;

    if (currentFiles.length === 1) {
      const file = currentFiles[0];

      if (isValid(file)) {
        setImg(file);
        open();
      } else {
        alert(`Wrong file type, ${file.type}`);
      }
    }
  };

  const onUploadClick = async () => {
    const canvas = avatarEditorRef.current.getImageScaledToCanvas();
    setIsLoading(true);
    try {
      const blob = await getBlob(canvas);

      const avatarFileRef = storage
        .ref(`/profiles/${profile.uid}`)
        .child("avatar");

      const uploadAvatar = await avatarFileRef.put(blob, {
        cacheControl: `public, max-age=${3600 * 24 * 3}`,
      });

      const downloadURL = await uploadAvatar.ref.getDownloadURL();

      const userAvatarRef = database
        .ref(`/profiles/${profile.uid}`)
        .child("avatar");

      userAvatarRef.set(downloadURL);

      setIsLoading(false);
      alert("Your avatar has been successfully uploaded!");
    } catch (err) {
      setIsLoading(false);
      alert(err.message);
    }
  };

  return (
    <div>
      <div className={classes.profile}>
        <AvatarProfile src={profile.avatar} name={profile.name} />
      </div>
      <label className={classes.chip} htmlFor="avatar-upload">
        Select Your Avatar
        <input
          className={classes.input}
          id="avatar-upload"
          type="file"
          accept={fileInputTypes}
          onChange={onFileInputChange}
        ></input>
      </label>

      <Modal open={isOpen} onClose={close} className={classes.modal}>
        <div className={classes.paper}>
          <h5>Adjust and upload new avatar</h5>
          <div>
            {img && (
              <AvatarEditor
                ref={avatarEditorRef}
                image={img}
                width={300}
                height={300}
                border={10}
                color={[255, 255, 255, 0.6]}
                borderRadius={100}
                rotate={0}
              />
            )}
          </div>
          <div className={classes.button}>
            <Button onClick={onUploadClick} disabled={isLoading}>
              Upload New Avatar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AvatarUpload;
