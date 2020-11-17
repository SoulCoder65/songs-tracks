import React, { useEffect, useState } from "react";
import axios from "axios";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import SlowMotionVideoTwoToneIcon from "@material-ui/icons/SlowMotionVideoTwoTone";
import "../../index.css";
import MusicNoteTwoToneIcon from "@material-ui/icons/MusicNoteTwoTone";
import DirectionsIcon from "@material-ui/icons/Directions";
import Divider from "@material-ui/core/Divider";

// Styling
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
// Styling End
const Navbar = ({ onSearch }) => {
  console.log(onSearch);
  const [trackSearch, getTrackSearch] = useState([]); //after getting response send response to app.js
  const [artistName, setArtistName] = useState("justin bieber"); //Artist or track_name
  const [onInputChange, setInput] = useState(""); //To check input field value change
  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_artist=${artistName.toLowerCase}&page_size=10&page=1&s_track_rating=desc&apikey=1d6e348cd4261044d7556280f3981ee9`
      )
      .then((data) => {
        console.log(data);
        if (data.data.message.body.track_list.length !== 0) {
          getTrackSearch(data.data.message.body);
        } else {
          axios
            .get(
              `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${artistName}&page_size=10&page=1&s_track_rating=desc&apikey=1d6e348cd4261044d7556280f3981ee9`
            )
            .then((dt) => {
              getTrackSearch(dt.data.message.body);
            });
        }
      })
      .catch((e) => console.log(e));
  }, [artistName]);

  const classes = useStyles();

  // O
  const onSearchClick = (e) => {
    setArtistName(onInputChange);
    onSearch(trackSearch);
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className="navbar"
          style={{ backgroundColor: "#31112c" }}
        >
          <Toolbar style={{ width: "100%" }}>
            <div className="flex-div">
              <div className="heading-div">
                <MusicNoteTwoToneIcon id="musicIcons" />
                <Typography id="navbar-heading">Soul Lyric</Typography>
                <MusicNoteTwoToneIcon id="musicIcons" />
              </div>
              <div className="search-div">
                <InputBase
                  className={classes.input}
                  onChange={(e) => setInput(e.target.value)}
                  value={onInputChange}
                  placeholder="Search Artist,Tracks"
                  inputProps={{ "aria-label": "search google maps" }}
                  style={{ color: "white" }}
                />
                <IconButton
                  type="submit"
                  className={classes.iconButton}
                  aria-label="search"
                  onClick={onSearchClick}
                  style={{ color: "white" }}
                >
                  <SearchIcon />
                </IconButton>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};
export default Navbar;
