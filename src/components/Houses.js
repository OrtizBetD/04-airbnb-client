import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import GoogleMap from "google-map-react";
import "../styles/cards.css";
import "../styles/grid.css";
import "../styles/maps.css";
import House from "./House";
import Thumbnail from "./Thumbnail";
import Nav from "./Nav";
import Pin from "./Pin";

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
          houses: res.data,
          originalHouses: res.data
        });
      })
      .catch(err => {
        console.log({ err });
      });
    console.log(this.state.houses);
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API}/types`)
      .then(res => {
        this.setState({
          types: res.data
        });
      })
      .catch(err => {
        console.log({ err });
      });
  }

  search = e => {
    //console.log(e.target.value);
    let v = e.target.value;
    let houses = this.state.originalHouses;
    let filtered_houses = houses.filter(h => {
      return (
        h.title.toLowerCase().includes(v.toLowerCase()) ||
        h.region.toLowerCase().includes(v.toLowerCase()) ||
        h.city.toLowerCase().includes(v.toLowerCase())
      );
    });
    this.setState({
      houses: filtered_houses
    });
  };

  selectOption = e => {
    console.log(e.target.value);

    let v = e.target.value;
    let houses = this.state.originalHouses;
    let filtered_houses = houses.filter(h => {
      return h.bedrooms >= v;
    });
    this.setState({
      houses: filtered_houses
    });
  };

  selectHouse = e => {
    //console.log(e.target.value);

    let v = e.target.value;
    if (v === "All Types") {
      let houses = this.state.originalHouses;
      this.setState({
        houses: houses
      });
    } else {
      let houses = this.state.originalHouses;
      let filtered_houses = houses.filter(h => {
        return h.type.name == v;
      });
      this.setState({
        houses: filtered_houses
      });
    }
  };

  maxPrice = e => {
    console.log(e.target.value);

    let v = e.target.value;
    let houses = this.state.originalHouses;
    let filtered_houses = houses.filter(h => {
      return h.price <= v;
    });
    this.setState({
      houses: filtered_houses
    });
  };
  houseOver = id => {
    let houses = this.state.houses;
    houses.map(h => {
      h.selected = false;
      return h;
    });
    let house = houses.find(e => e._id == id);
    console.log("house", house);
    house.selected = true;
    this.setState({ houses });
  };
  render() {
    return (
      <>
        <Nav />
        <div className="filters">
          <select onChange={this.selectOption}>
            {[...Array(6)].map((e, i) => {
              return <option value={i + 1}>Min Bedrooms: {i + 1}</option>;
            })}
          </select>
          }
          <select onChange={this.selectHouse}>
            <option value="All Types">All Types</option>
            {this.state.types.map(element => {
              return (
                <option key={element._id} value={element.name}>
                  {element.name}
                </option>
              );
            })}
          </select>
          <input
            type="number"
            placeholder="max price"
            onChange={this.maxPrice}
          />
          <select>
            <option value="price">Lowest Price</option>
            <option value="rating">Highest Rating</option>
          </select>
          <input
            type="text"
            className="search"
            placeholder="Search..."
            onChange={this.search}
          />
        </div>
        <div className="grid map">
          <div className="grid four large">
            {// List of thumbnails
            this.state.houses.map(house => (
              <Thumbnail house={house} key={house._id} id={this.houseOver} />
            ))}
          </div>
          <div className="map">
            <GoogleMap
              bootstrapURLKeys={this.state.map.key}
              center={this.state.map.center}
              zoom={this.state.map.zoom}
            >
              {// List of Pins
              this.state.houses.map(e => (
                <Pin house={e} key={e._id} lat={e.lat} lng={e.lng} />
              ))}
            </GoogleMap>
          </div>
        </div>
      </>
    );
  }
}

export default Houses;
