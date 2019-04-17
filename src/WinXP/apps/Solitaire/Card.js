import React from "react";

function Card(props) {
  function displayImg() {
    let myImgSource;
    if (props.slotType === "topslot") {
      myImgSource = require(`../../../assets/solitaire/${
        props.suite
      }${props.weight + 1}.png`);
    } else if (props.slotType === "deck") {
      myImgSource = require(`../../../assets/solitaire/shirt13.png`);
    } else if (props.slotType === "stack") {
      myImgSource = props.visible
        ? require(`../../../assets/solitaire/${props.suite}${props.weight +
            1}.png`)
        : (myImgSource = require(`../../../assets/solitaire/shirt13.png`));
    }
    return myImgSource;
  }

  return (
    <div
      className='card'
      style={{
        position: "absolute",
        top: `${props.num * 3 + 96 + 7}px`
      }}
    >
      <img src={displayImg()} alt='Card' />
    </div>
  );
}

export default Card;
