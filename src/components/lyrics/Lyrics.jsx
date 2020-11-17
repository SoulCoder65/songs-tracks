import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import "../../index.css";
import Moment from "react-moment";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

// APi
const api = process.env.REACT_APP_MUSIC_API_KEY;

const Lyrics = () => {
  const classes = useStyles();
  const [Data, setData] = useState([]);
  const params = useParams();
  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${params.id}&apikey=${api}`
      )
      .then((data) => {
        setData(data.data.message.body.lyrics);
        console.log(data.data.message.body.lyrics);
      })
      .catch((e) => console.log(e));
  }, [Data]);
  return (
    <>
      <div className="lyrics-div">
        <Card
          className={classes.root}
          style={{
            backgroundColor: "white",
            maxWidth: "80%",
            marginLeft: "10%",
          }}
        >
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {params.name[0]}
              </Avatar>
            }
            title={params.name}
            subheader={Data.lyrics_language}
          />
          <hr />
          <CardContent>
            <Typography variant="h6" component="h2" style={{ color: "black" }}>
              {Data.lyrics_body}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="secondary">
              <NavLink
                to="/"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Back
              </NavLink>
            </Button>
          </CardActions>
        </Card>
      </div>
    </>
  );
};
export default Lyrics;
