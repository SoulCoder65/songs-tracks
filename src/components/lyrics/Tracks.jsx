import { React, useState, useEffect } from "react";
import "../../index.css";
import { useContext } from "react";
import { ApiData } from "../../App";
import TrackCard from "./TrackCard";
import Loader from "../../Images/loader.png";
import Grid from "@material-ui/core/Grid";

const Tracks = () => {
  const [state, setState] = useState([]);
  const ApiResponse = useContext(ApiData);
  useEffect(() => {
    setState(ApiResponse.track_list);
  });

  if (state !== undefined) {
    return (
      <>
        <div className="Tracks-records" style={{}}>
          <h1>Top 10 Tracks</h1>
        </div>
        <div className="tracks-row ">
          <Grid container spacing={5}>
            {state.map((data, index) => {
              return (
                <TrackCard
                  key={index}
                  data={data}
                  style={{ textAlign: "center" }}
                />
              );
            })}
          </Grid>
        </div>
      </>
    );
  } else {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          textAlign: "center",
          marginTop: "15%",
        }}
      >
        <img id="loader" src={Loader} alt="s" style={{ marginTop: "16%" }} />;
      </div>
    );
  }
};
export default Tracks;
