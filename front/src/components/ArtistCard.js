// ArtistCard.js
import React from "react";

function ArtistCard ({ artist }) {
  return (
    <div className="artist-card mobile:flex mobile:flex-col mobile:items-center mobile:p-3">
    <img className="artist-img w-44 h-44 box-border border-black border-2 p-4" src={artist.images[0]?.url} alt={artist.name} />
    <p className="artist-name font-ibm p-2 flex justify-center">{artist.name}</p>
  </div>
  )
  
};

export default ArtistCard;
