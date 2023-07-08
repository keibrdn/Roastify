import React, { useState, useEffect }  from "react";
import SpotifyWebApi from "spotify-web-api-js";
import axios from "axios";
import { TypeAnimation } from "react-type-animation";
import ArtistContainer from "../components/ArtistContainer";
import HomeButton from "../components/HomeButton";

const spotify = new SpotifyWebApi();

function ResultsPage() {
  const [token, setToken] = useState(null);
  const [topArtists, setTopArtists] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [completionOutput, setCompletionOutput] = useState("");


  //gets access token from url and creates instance of spotify API after log in is set to true
  useEffect(() => {
    const params = getHashParams();
    const accessToken = params.access_token;
    setToken(accessToken);
    spotify.setAccessToken(accessToken);
  }, [loggedIn]);

  //automatically loads when token is successfully retrieved
  useEffect(() => {
    if (token) {
      getTopArtists();
    }
  }, [token]);

  useEffect(() => {
    if (topArtists.length) {
      getCompletion(topArtists);
    }
  }, [topArtists]);

  //retrieves token param from url
  const getHashParams = () => {
    const hashParams = {};
    const regex = /([^&;=]+)=?([^&;]*)/g;
    const queryString = window.location.hash.substring(1);
    let match = regex.exec(queryString);
    while (match) {
      hashParams[match[1]] = decodeURIComponent(match[2]);
      match = regex.exec(queryString);
    }
    return hashParams;
  };

  const getTopArtists = () => {
    spotify
      .getMyTopArtists({ limit: 3, time_range: "long_term" })
      .then((res) => {
        setTopArtists(res.items);
      });
  };

  //sets to true when log in button is pressed
  const handleLogin = () => {
    setLoggedIn(true);
  };

  const getCompletion = (artists) => {
    axios
      .post("http://localhost:9000/openai", {
        name: artists,
      })
      .then((res) => {
        console.log(res.data.content);
        setCompletionOutput(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
        <div className="w-screen h-screen bg-green mobile:h-full mobile:w-full">
            <HomeButton/>
            <div className="font-rubik text-4xl flex justify-center mobile:text-2xl">Your top artists</div>
            <ArtistContainer topArtists={topArtists}/>
            <div className="flex justify-center">
              <p className="p-6 w-8/12 max-h-80 overflow-auto overscroll-contain font-ibm text-sm leading-6 border-black border-2">
                {completionOutput}
              </p> 
            </div>
            
        </div>
        
    </>
  );
}

export default ResultsPage;
