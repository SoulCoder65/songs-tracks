import React, { useEffect, useState, createContext } from "react";
import { Route, Switch } from "react-router";
import Navbar from "./components/layout/Navbar";
import axios from "axios";
import Tracks from "./components/lyrics/Tracks";
import "./App.css";
import Lyrics from "./components/lyrics/Lyrics";
import Loader from "./Images/loader.png";
import "./index.css";
import { HashRouter } from "react-router-dom";
// Context APi
const ApiData = createContext();
// Api
const api = process.env.REACT_APP_MUSIC_API_KEY;

// Main App
const App = () => {
  const [Data, setData] = useState([]);
  // On search btn functionality
  const onSearch = (searchResponse) => {
    setData(searchResponse);
  };

  // On search btn functionality End
  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=in&f_has_lyrics=1&apikey=${api}`
      )
      .then((data) => {
        setData(data.data.message.body);
      })
      .catch((e) => console.log(e));
  }, []);

  if (Data !== null || Data.length !== 0) {
    return (
      <HashRouter basename="/">
        <>
          <ApiData.Provider value={Data}>
            <Navbar onSearch={onSearch} />
            <div className="body">
              <Switch>
                <Route exact path="/" component={Tracks} />
                <Route exact path="/track/:name/:id" component={Lyrics} />
              </Switch>
            </div>
          </ApiData.Provider>
        </>
      </HashRouter>
    );
  } else {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          textAlign: "center",
          marginTop: "14%",
        }}
      >
        <img id="loader" src={Loader} alt="s" />;
      </div>
    );
  }
};
export default App;
export { ApiData };
