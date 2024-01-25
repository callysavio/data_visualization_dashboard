import React from 'react'
import logo from "../images/logo.png";
import { Link } from 'react-router-dom';
function NavBar() {
  return (
    <div>
      <div id="side-nav">
        
          <img id="logo" src={logo} alt="dashboard logo" />
          <nav id="nav-bar">
            <ul className="nav-ul">
              <li className="nav-li">
                <Link className="link" to="/">Key Analytics</Link>
              </li>
              <li className="nav-li">
                <Link className="link" to="/intensity">Intensity</Link>
              </li>
              <li className="nav-li">
                <Link className="link" to="/likelihood">Likelihood</Link>
              </li>
              <li className="nav-li">
                <Link className="link" to="/relevance">Relevance</Link>
              </li>
              <li className="nav-li">
                <Link className="link" to="/year">Year</Link>
              </li>
              <li className="nav-li">
                <Link className="link" to="/country">Country</Link>
              </li>
              <li className="nav-li">
                <Link className="link" to="/topics">Topics</Link>
              </li>
              <li className="nav-li">
                <Link className="link" to="/region">Region</Link>
              </li>
              <li className="nav-li">
                <Link className="link" to="/city">City</Link>
              </li>
            </ul>
          </nav>
        </div>
    </div>
  )
}

export default NavBar
