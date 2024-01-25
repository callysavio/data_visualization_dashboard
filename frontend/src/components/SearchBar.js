import React from "react";
import userImage from "../images/user.jpg";

export function hideNavBar() {
    document.getElementById("side-nav").style.display = "none";
    document.getElementById("show-nav").style.display = "block";
    document.getElementById("hide-nav").style.display = "";

  };

function SearchBar() {
  const openFilter = () => {
    document.getElementById("filter-component").style.display = "block";
  };

  const showNavBar = () => {
    document.getElementById("side-nav").style.display = "block";
    document.getElementById("show-nav").style.display = "none";
    document.getElementById("hide-nav").style.display = "block";
  };

  

  return (
    <div>
      <div id="search-bar">
        <i className="fa fa-bars" onClick={showNavBar} id="show-nav"></i>
        <i className="fa fa-times" onClick={hideNavBar} id="hide-nav"></i>
        <div className="search-icons" id="s1">
          <i className="fa fa-filter" id="filter-icon" onClick={openFilter}></i>
          <span id="filter-text" onClick={openFilter}>
            Filter
          </span>
        </div>
        <h2 id="main-h2">Data visualization Dashboard</h2>
        <div className="search-icons" id="s2">
          <i className="fa fa-bell-o" id="notification-icon"></i>
          <img alt="userimage" src={userImage} id="user-image" />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
