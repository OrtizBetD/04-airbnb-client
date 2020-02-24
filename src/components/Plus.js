import React from "react";
import axios from "axios";
import Thumbnail from "./Thumbnail";

class Favorites extends React.Component {
  state = {
    houses: []
  };
  componentWillMount() {
    axios
      .get(`${process.env.REACT_APP_API}/houses?plus=true`)
      .then(res => {
        this.setState({ houses: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  idBuffer = () => {
    //  console.log("hello");
  };
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
        <div className="narrow">
          <div className="grid four large">
            {// List of thumbnails
            this.state.houses.map(house => (
              <Thumbnail house={house} key={house._id} id={this.idBuffer} />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default Favorites;
