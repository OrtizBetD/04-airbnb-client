import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import GoogleMap from "google-map-react";
import "../styles/cards.css";
import "../styles/grid.css";
import "../styles/maps.css";
import "../styles/nav.css";
import House from "./House";
import Thumbnail from "./Thumbnail";

class Houses extends React.Component {
  state = {
    houses: [],
    types: [],
    map: {
      key: {
        key: "AIzaSyBKMVj4gaJLU9GTV1zOaWQj7ggKVbXQep0"
      },
      center: {
        lat: -8.652,
        lng: 115.137
      },
      zoom: 14
    }
  };
  componentWillMount() {
    console.log(process.env);
    axios
      .get(`${process.env.REACT_APP_API}/houses`)
      .then(res => {
        this.setState({
          houses: res.data
        });
      })
      .catch(err => {
        console.log({ err });
      });
  }
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
        <div className="filters">
          <select>
            <option value="">Min Bedrooms: 1</option>
          </select>
          <select>
            <option value="">All Types</option>
          </select>
          <input type="number" placeholder="max price" />
          <select>
            <option value="price">Lowest Price</option>
            <option value="rating">Highest Rating</option>
          </select>
          <input type="text" className="search" placeholder="Search..." />
        </div>
        <div className="grid map">
          <div className="grid four large">
            {// List of thumbnails
            this.state.houses.map(house => (
              <Thumbnail house={house} />
            ))}
          </div>
          <div className="map">
            <GoogleMap
              bootstrapURLKeys={this.state.map.key}
              center={this.state.map.center}
              zoom={this.state.map.zoom}
            ></GoogleMap>
          </div>
        </div>
      </>
    );
  }
}

export default Houses;
