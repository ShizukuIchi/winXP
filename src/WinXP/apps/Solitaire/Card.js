import React, { useState } from "react";

function Card(props) {
  //Follow the card status, some variables will certainly be deleted to optimize
  const [gamePosition, setGamePosition] = useState({
    slotType: props.slotType,
    row: props.row,
    num: props.num,
    visible: props.visible
  });

  const [position, setPosition] = useState(computePosition());

  function computePosition() {
    let myPosition = {};
    switch (gamePosition.slotType) {
      case "stack":
        myPosition.x = gamePosition.row * (71 + 12.5) + 8;
        myPosition.y = gamePosition.num * 3 + 96 + 7 + props.numVisible * 12;
        break;
      case "topslot":
        myPosition.x = (3 + gamePosition.row) * (71 + 12.5) + 8;
        myPosition.y = 3;
        break;
      case "deck":
        if (props.visible) {
          myPosition.x = 8 + 71 + 12.5;
          myPosition.y = 3;
        } else {
          myPosition.x = 8;
          myPosition.y = 3;
        }
        break;
      default:
        console.log("error");
        break;
    }
    myPosition.z = 1;
    myPosition.offset = {};
    return myPosition;
  }

  function displayImg() {
    let myImgSource;
    if (gamePosition.slotType === "topslot") {
      myImgSource = require(`../../../assets/solitaire/${
        props.suite
        }${props.weight + 1}.png`);
    } else if (gamePosition.slotType === "deck") {
      myImgSource = gamePosition.visible
        ? require(`../../../assets/solitaire/${props.suite}${props.weight +
          1}.png`)
        : (myImgSource = require(`../../../assets/solitaire/shirt13.png`));
    } else if (gamePosition.slotType === "stack") {
      myImgSource = gamePosition.visible
        ? require(`../../../assets/solitaire/${props.suite}${props.weight +
          1}.png`)
        : (myImgSource = require(`../../../assets/solitaire/shirt13.png`));
    }
    return myImgSource;
  }

  function onDragStart(e) {
    if (!props.checkLastCard && gamePosition.visible) {
      //Move several cards ==> HOW ?

    }
    if (gamePosition.visible) {
      //Data
      const dt = e.dataTransfer;
      dt.setData("text/plain", [props.type, props.suite, props.color, props.weight, props.row, props.slotType]);
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
    if (gamePosition.visible) {
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
    if (gamePosition.visible) {
      setPosition({
        ...position,
        x: gamePosition.row * (71 + 12.5) + 8,
        y: gamePosition.num * 3 + 96 + 7,
        z: 1,
        offset: {},
      });
    }
  }

  function onClick(e) {
    if (!gamePosition.visible && gamePosition.slotType === "stack" && props.checkLastCard(props.row, props.num)) {
      setGamePosition({
        ...gamePosition,
        visible: true
      })
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
      onClick={onClick}
    >
      <img src={displayImg()} alt="Card" />
    </div>
  );
}

export default Card;
