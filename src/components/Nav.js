import React from "react";
import Houses from "./Houses";
import Plus from "./Plus";
import { Link } from "react-router-dom";

//css
import "../styles/nav.css";

class Nav extends React.Component {
  render() {
    return (
      <>
        <nav>
          <a href="/" className="logo"></a>
          <div className="profile">
            <a href="/plus" className="button">
              <span>Airbnb Plus</span>
            </a>
          </div>
        </nav>
      </>
    );
  }
}

export default Nav;
