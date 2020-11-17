import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Loader from "../../Images/loader.png";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/Star";
import AlbumIcon from "@material-ui/icons/Album";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import { NavLink } from "react-router-dom";
import "../../index.css";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const TrackCard = ({ data }) => {
  const dt = data.track;
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  if (data.length !== 0) {
    return (
      <Grid item sm={12} md={6}>
        <Card className={classes.root} style={{ backgroundColor: "#31112c" }}>
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              style={{ fontWeight: "bold", color: "#fff" }}
            >
              {dt.track_name}
            </Typography>
            <Typography
              className={classes.pos}
              variant="caption"
              color="textSecondary"
              style={{
                display: "flex",
                flexDirection: "row",
                color: "#fff",
                marginTop: "3%",
              }}
            >
              <StarIcon style={{ marginRight: "2%", color: "yellow" }} />{" "}
              {dt.track_rating}
            </Typography>
            <Typography
              className={classes.pos}
              variant="caption"
              color="textSecondary"
              style={{
                display: "flex",
                flexDirection: "row",
                color: "#fff",
              }}
            >
              <AlbumIcon style={{ marginRight: "2%", color: "yellow" }} />{" "}
              {dt.album_name}
            </Typography>
            <Typography
              className={classes.pos}
              variant="caption"
              color="textSecondary"
              style={{ display: "flex", flexDirection: "row", color: "#fff" }}
            >
              <RecordVoiceOverIcon
                style={{ marginRight: "2%", color: "yellow" }}
              />{" "}
              {dt.artist_name}
            </Typography>
          </CardContent>
          <CardActions>
            <NavLink
              to={`/track/${dt.artist_name}/${dt.track_id}`}
              className="link-css"
            >
              View
            </NavLink>
          </CardActions>
        </Card>
      </Grid>
    );
  } else {
    return (
      <div style={{ width: "100vw", height: "100vh", textAlign: "center" }}>
        <img id="loader" src={Loader} alt="s" />;
      </div>
    );
  }
};
export default TrackCard;

// {/* 2 */}
// <Grid item xs={12} md={6}>
//   <Card className={classes.root}>
//     <CardContent>
//       <Typography
//         className={classes.title}
//         color="textSecondary"
//         gutterBottom
//       ></Typography>
//       <Typography variant="h5" component="h2">
//         hello
//       </Typography>
//       <Typography className={classes.pos} color="textSecondary">
//         adjective
//       </Typography>
//       <Typography variant="body2" component="p">
//         well meaning and kindly.
//         <br />
//         {'"a benevolent smile"'}
//       </Typography>
//     </CardContent>
//     <CardActions>
//       <Button size="small">Learn More</Button>
//     </CardActions>
//   </Card>
// </Grid>
// </Grid>
