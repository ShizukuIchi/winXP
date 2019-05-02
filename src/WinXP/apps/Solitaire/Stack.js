import React from "react";

function Stack(props) {

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
      originalRow: cardProps[4],
      slotType: cardProps[5]
    };
    add(myCard);
  }

  function add(card) {
    if (props.cards.length === 0 && card.type === "king") {
      props.cardDropping(card.originalRow, props.row, card.slotType);
    }
    else if (
      props.cards.length > 0 &&
      (card.weight < getLastCard().props.weight &&
        getLastCard().props.weight - card.weight === 1) &&
      card.color !== getLastCard().props.color
    ) {
      props.cardDropping(card.originalRow, props.row, card.slotType);
    }
  }

  return (
    <div
      className="stack"
      id={`stack-${props.row}`}
      style={{
        height: "192px",
        display: "flex"
      }}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {props.cards.map(item => {
        return item;
      })}
    </div>
  );
}

export default Stack;
