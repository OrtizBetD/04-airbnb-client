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
require('dotenv').config();

class Houses extends React.Component {
  //Initial state definition
  state =
  {
    houses: [],
    allHouses:[],
    types: [],
    typeFilter: 'allTypes',
    minbedrooms:0,
    price: 200000,
    map: {
      key: {
        key: process.env.REACT_APP_API_KEY
      },
      center: {
        lat: -8.652,
        lng: 115.137
      },
      zoom: 14
    }
  };
  async componentWillMount() {
    console.log(process.env.REACT_APP_API_KEY);
    axios
      .get(`${process.env.REACT_APP_API}/houses`)
      .then(res => {
        this.setState({
          houses: res.data,
          allHouses: res.data
        });
      })
      .catch(err => {
        console.log({ err });
      });
    console.log(this.state.houses);
  }

  async componentDidMount() {
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
    let houses = this.state.allHouses;
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



//filtering houses by type of houses

  selectHouse = e => {
    //console.log(e.target.value);

    let typeFilter = e.target.value;
    let houses = this.state.allHouses;
    let filtered_houses = houses.filter(house => {
			return house.type.name == e.target.value
		})
    if (typeFilter === "All Types") {
      this.setState({ typeFilter, houses}, () => this.applyFilter()
      );
    }
    else {

      this.setState({typeFilter, houses: filtered_houses}, () => this.applyFilter());
    }
  };

  //filtering houses by number of bedrooms
    selectOption = e => {

      let numberBedrooms = e.target.value;
      this.setState({ minbedrooms: numberBedrooms}, () => this.applyFilter())
      }
  maxPrice = e => {

    let price = e.target.value;
    if (price == ''){
      this.setState({
          price: 1000000
      },
      () => this.applyFilter()
    )
  }
    else{
    this.setState({price}, () => this.applyFilter())
  };
}

  applyFilter = () => {
    let filterHouses = []
    this.state.allHouses.forEach(house => {
      if (
          house.bedrooms > this.state.minbedrooms &&
          house.price < Number(this.state.price) &&
          (house.type.name == this.state.typeFilter ||
           this.state.typeFilter == 'allTypes')

      ){
        filterHouses.push(house)
      }

    })
    this.setState({houses: filterHouses})
  }
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
        {/*Filtering in dropdown menu by number of bedrooms*/}
        <div className="filters">
          <select onChange={this.selectOption}>
            {[...Array(6)].map((e, i) => {
              return <option value={i + 1}>Min Bedrooms: {i + 1}</option>;
            })}
          </select>
          {/* Room Types */}
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
