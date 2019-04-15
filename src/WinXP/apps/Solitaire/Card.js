import React, { Component } from "react";

class Card extends Component {
  constructor(props) {
    super(props);
    this.displayImg = this.displayImg.bind(this);
  }

  displayImg() {
    let myImgSource;
    if (this.props.slotType === "topslot") {
      myImgSource = require(`../../../assets/solitaire/${this.props.suite}${this
        .props.weight + 1}.png`);
    } else if (this.props.slotType === "deck") {
      myImgSource = require(`../../../assets/solitaire/shirt13.png`);
    } else if (this.props.slotType === "stack") {
      myImgSource = this.props.lastCard
        ? require(`../../../assets/solitaire/${this.props.suite}${this.props
            .weight + 1}.png`)
        : (myImgSource = require(`../../../assets/solitaire/shirt13.png`));
    }
    return myImgSource;
  }

  render() {
    return (
      <div
        className='card'
        style={{
          position: "absolute",
          top: `${this.props.num * 3 + 96 + 7}px`
        }}
      >
        <img src={this.displayImg()} alt='Card' />
      </div>
    );
  }
}

export default Card;
