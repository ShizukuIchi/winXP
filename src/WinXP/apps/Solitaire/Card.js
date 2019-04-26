import React, { useState } from "react";

function Card(props) {
  //Follow where the card is on the game
  const [gamePosition, setGamePosition] = useState({
    slotType: props.slotType,
    row: props.row,
    num: props.num
  })

  const [position, setPosition] = useState({
    x: gamePosition.row * (71 + 12.5) + 8,
    y: gamePosition.num * 3 + 96 + 7,
    z: 1,
    offset: {},
  });

  function displayImg() {
    let myImgSource;
    if (gamePosition.slotType === "topslot") {
      myImgSource = require(`../../../assets/solitaire/${
        props.suite
        }${props.weight + 1}.png`);
    } else if (gamePosition.slotType === "deck") {
      myImgSource = require(`../../../assets/solitaire/shirt13.png`);
    } else if (gamePosition.slotType === "stack") {
      myImgSource = props.visible
        ? require(`../../../assets/solitaire/${props.suite}${props.weight +
          1}.png`)
        : (myImgSource = require(`../../../assets/solitaire/shirt13.png`));
    }
    return myImgSource;
  }

  function onDragStart(e) {
    if (props.visible) {
      //Data
      const dt = e.dataTransfer;
      dt.setData("text/plain", [props.type, props.suite, props.color, props.weight, props.row]);
      dt.effectAllowed = "move";
      //Positioning
      let bbox = e.target.getBoundingClientRect();
      const x = e.clientX - bbox.left;
      const y = e.clientY - bbox.top;
      setPosition({
        ...position,
        offset: {
          x,
          y,
        },
      });
    }
  }

  function onDrag(e) {
    if (props.visible) {
      let bbox = e.target.getBoundingClientRect();
      const x = e.clientX - bbox.left;
      const y = e.clientY - bbox.top;
      setPosition({
        ...position,
        x: position.x - (position.offset.x - x),
        y: position.y - (position.offset.y - y),
        z: 0,
      });
    }
  }

  function onDragEnd(e) {
    if (props.visible) {
      setPosition({
        ...position,
        x: gamePosition.row * (71 + 12.5) + 8,
        y: gamePosition.num * 3 + 96 + 7,
        z: 1,
        offset: {},
      });
    }
  }

  return (
    <div
      className={"card "}
      style={{
        position: "absolute",
        top: `${position.y}px`,
        left: `${position.x}px`,
        zIndex: position.z
      }}
      draggable
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
    >
      <img src={displayImg()} alt="Card" />
    </div>
  );
}

export default Card;
