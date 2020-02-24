import React from "react";
import axios from "axios";
import Thumbnail from "./Thumbnail";
import Nav from "./Nav";

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
        <Nav />
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
