import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import ArtistContainer from "../components/ArtistContainer";

import axios from "axios";
import HomeButton from "../components/HomeButton";

const spotify = new SpotifyWebApi();

const HomePage = () => {

  return (
    <>
      <div className="w-screen h-screen bg-green">
        <HomeButton/>
        <p className="font-rubik text-8xl my-40 flex justify-center tablet:text-3xl">roastify</p>
        <a href="http://localhost:9000/login" className="flex justify-center ">
          <button className="bg-coral px-8 py-2 tablet:text-xl hover:drop-shadow-block font-ibm">Login with Spotify</button>
        </a>
      </div>
    </>
  );
};

export default HomePage;
