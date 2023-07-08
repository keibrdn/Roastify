// ArtistContainer.js
import React from "react";
import ArtistCard from "./ArtistCard";

function ArtistContainer({ topArtists }) {
  return (
    <div className="flex flex-row mobile:flex-col my-10 justify-center justify-evenly">
    {topArtists.map((artist) => (
      <ArtistCard key={artist.id} artist={artist} />
    ))}
    </div>
  )
};

export default ArtistContainer;
