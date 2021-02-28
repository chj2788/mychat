import React, { useCallback, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Grid, Modal, Tooltip } from "@material-ui/core";
import { useModalState } from "../misc/custom-hooks";
import Dashboard from "./Dashboard";
import { auth, database } from "../misc/firebase";
import CreateRoom from "./CreateRoom";
import ChatRoomList from "./rooms/ChatRoomList";
import AvatarProfile from "./AvatarProfile";
import { isOfflineForDatabase, useProfile } from "../context/profile.context";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChatName from "./chat-window/top/ChatName";
import Chat from "./rooms/Chat";

const drawerWidth = "35%";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
    },
    flexShrink: 0,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth})`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
    },
    backgroundColor: "#212121",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  conversation: {
    margin: "1em auto",
    textAlign: "center",
    justifyContent: "center",
    display: "flex",
  },
  buttonGrid: {
    margin: "1em auto",
  },
  name: {
    fontSize: "2em",
  },
  profile: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    margin: "0 auto 2em",
    cursor: "pointer",
    "&:hover": {
      opacity: 0.2,
    },
  },
  flexy: {
    display: "flex",
  },
}));

function ResponsiveDrawer() {
  const classes = useStyles();
  const [opening, setOpening] = useState(false);
  const { profile } = useProfile();
  const handleDrawerOpen = () => {
    setOpening(true);
  };
  const handleDrawerClose = () => {
    setOpening(false);
  };

  const { isOpen, open, close } = useModalState();

  const onSignOut = useCallback(() => {
    database
      .ref(`/status/${auth.currentUser.uid}`)
      .set(isOfflineForDatabase)
      .then(() => {
        auth.signOut();
        alert("Signed out");
        close();
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [close]);

  const drawer = (
    <div>
      {/* <div className={classes.toolbar} /> */}
      <Divider />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.buttonGrid}
      >
        <p className={classes.name}>Hey, {profile.name}</p>
        <Tooltip
          arrow
          title={"Click to edit your profile"}
          placement="top-start"
        >
          <div onClick={open}>
            <AvatarProfile
              className={classes.profile}
              src={profile.avatar}
              name={profile.name}
            />
          </div>
        </Tooltip>
        <Modal open={isOpen} onClose={close} className={classes.modal}>
          <Dashboard onSignOut={onSignOut} />
        </Modal>
      </Grid>
      <Divider />
      <Typography variant="h6" className={classes.conversation}>
        CONVERSATIONS
      </Typography>
      <CreateRoom className="classes.flexy" />
      <ChatRoomList />
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: opening,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, opening && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <ChatName />
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={opening}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        {drawer}
      </Drawer>

      {/* <main
        className={clsx(classes.content, {
          [classes.contentShift]: opening,
        })}
      > */}
      <div className={classes.drawerHeader} />
      {/* <Chat /> */}
      {/* </main> */}
    </div>
  );
}

export default ResponsiveDrawer;
