import React from "react";
import emptyBackground from "../../../assets/solitaire/empty.png";

function Topslot(props) {
  function getLastCard() {
    return props.cards[props.cards.length - 1];
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  function onDrop(e) {
    let cardProps = e.dataTransfer.getData("text").split(",");
    let myCard = {
      type: cardProps[0],
      suite: cardProps[1],
      color: cardProps[2],
      weight: cardProps[3],
      originalRow: cardProps[4]
    };
    add(myCard);
  }

  function add(card) {
    if (props.cards.length === 0 && card.type === "ace") {
      props.cardDropping(card.originalRow, props.row);
    }
    else if (
      props.cards.length > 0 &&
      parseInt(card.weight) === getLastCard().props.weight + 1 &&
      card.suite === getLastCard().props.suite
    ) {
      props.cardDropping(card.originalRow, props.row);
    }
  }

  return (
    <div
      className="topslot"
      style={{
        height: "96px",
        display: "flex",
        zIndex: 1,
      }}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {props.cards.length === 0 ? <img src={emptyBackground} alt="Slot" /> : ""}
      {props.cards.map((item, index) => {
        return item;
      })}
    </div>
  );
}

export default Topslot;
