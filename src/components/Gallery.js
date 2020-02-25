import React from "react";
import house from "./House";
class Gallery extends React.Component {
  state = {
    selectedImages: "m"
  };

  componentDidMount() {
    this.setState({ selectedImages: this.props.house.images[0] });
  }
  selectImage = (image, pos) => {
    //  console.log(image);

    /*  let house = houses.find(e => e._id == id);
    console.log("house", house);
    house.selected = true;*/
    this.setState({ selectedImages: image });
    //  console.log(this.state.selectedImages);
  };
  render() {
    return (
      <div className="gallery">
        <div
          style={{
            backgroundImage: `url('${this.state.selectedImages}')`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
          className="image-main"
        ></div>
        <div className="previews">
          {this.props.house.images.map((image, i) => (
            <div
              style={{
                backgroundImage: `url(${image})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}
              className="preview"
              key={i}
              onClick={e => this.selectImage(image, i)}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

export default Gallery;
