import React from "react";
import "../App.css";

function HomeButton() {
  return (
    <>
      <a href="/" className="mobile:flex mobile:justify-center">
        <button className="bg-coral m-8 px-8 py-1 tablet:text-xl font-ibm hover:drop-shadow-block">
          Home
        </button>
      </a>
    </>
  );
}

export default HomeButton;
