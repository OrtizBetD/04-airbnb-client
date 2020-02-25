import React from "react";
import axios from "axios";
import Nav from "./Nav";
import Gallery from "./Gallery";
import Review from "./Review";
// Components

// CSS
import "../styles/cards.css";
import "../styles/grid.css";
import "../styles/users.css";
import "../styles/gallery.css";

class House extends React.Component {
  state = {
    house: {
      images: [],
      type: {
        name: ""
      },
      host: {
        name: "",
        avatar: ""
      },
      amenities: [],
      rating: 0
    },
    reviews: []
  };
  componentWillMount() {}
  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API}/houses/${this.props.match.params.id}`)
      .then(res => {
        console.log(res.data);
        this.setState({
          house: res.data
        });
      })
      .catch(err => {
        console.log({ err });
      });
    axios
      .get(
        `${process.env.REACT_APP_API}/reviews?house=${this.props.match.params.id}`
      )
      .then(res => {
        console.log(res.data);
        this.setState({
          reviews: res.data
        });
        console.log(this.state.reviews);
      })
      .catch(err => {
        console.log({ err });
      });
  }

  render() {
    return (
      <>
        <Nav />
        <Gallery house={this.state.house} key={this.state.house._id} />
        <div className="grid medium">
          <div className="grid sidebar-right">
            <div className="content">
              <h1>{this.state.house.title}</h1>
              <small>
                <i className="fas fa-map-marker-alt"></i>
                <span>
                  {this.state.house.city}, {this.state.house.region}
                </span>
              </small>
              <div className="user">
                <div
                  className="avatar"
                  style={{
                    backgroundImage: `url('${this.state.house.host.avatar}')`
                  }}
                ></div>
                <div className="name">
                  <small>Hosted by</small>
                  <span>{this.state.house.host.name}</span>
                </div>
              </div>
              <div className="card specs">
                <div className="content">
                  <ul className="grid two">
                    <li>
                      <i className="fas fa-fw fa-home"></i>
                      {this.state.house.type.name}
                    </li>
                    <li>
                      <i className="fas fa-fw fa-user-friends"></i>
                      {this.state.house.guests} guests
                    </li>
                    <li>
                      <i className="fas fa-fw fa-bed"></i>
                      {this.state.house.bedrooms} bedrooms
                    </li>
                    <li>
                      <i className="fas fa-fw fa-bath"></i>
                      {this.state.house.bathrooms} bathrooms
                    </li>
                  </ul>
                </div>
              </div>
              <p>{this.state.house.description}</p>
              <h3>Amenities</h3>
              <div className="card specs">
                <div className="content">
                  <ul className="grid two">
                    {this.state.house.amenities.map((a, i) => {
                      return (
                        <li key={i}>
                          <i className={`fas fa-fw fa-${a.icon}`}></i>
                          {a.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <Review
                reviews={this.state.reviews}
                key={this.state.reviews._id}
              />
            </div>
            <div className="sidebar">
              <div className="card shadow">
                <div className="content large">
                  <h3>
                    ${this.state.house.price}
                    <small>per night</small>
                  </h3>
                  <small>
                    {[...Array(this.state.house.rating)].map((e, i) => {
                      return <i className="fas fa-star"></i>;
                    })}
                    {[...Array(5 - this.state.house.rating)].map((e, i) => {
                      return <i className="far fa-star"></i>;
                    })}
                    <span>{this.state.reviews.length} Reviews</span>
                  </small>
                  <form className="small">
                    <div className="group">
                      <label>Guests</label>
                      <select>
                        {[...Array(this.state.house.guests)].map((e, i) => {
                          return <option value={i + 1}>{i + 1} guests</option>;
                        })}
                      </select>
                    </div>
                    <div className="group">
                      <button className="secondary full" type="submit">
                        Book this house
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default House;
