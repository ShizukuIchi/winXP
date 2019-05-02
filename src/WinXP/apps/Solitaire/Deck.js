import React from "react";
import emptyBackground from "../../../assets/solitaire/empty.png";

function Deck(props) {
  function onClick(e) {
    props.onClick();
  }

  return (
    <div
      className="deck"
      style={{
        height: "96px",
        gridColumn: "auto / span 3",
        display: "flex",
      }}
      onClick={onClick}
    >
      <img src={emptyBackground} alt="Slot" />
      {props.cards.map((item, index) => {
        return item;
      })}
    </div>
  );
}

export default Deck;
