import React, { useState } from "react";
import emptyBackground from "../../../assets/solitaire/empty.png";

function Topslot(props) {
  const [cards, setCards] = useState(props.cards);

  function onDragOver(e) {
    e.preventDefault();
  }

  function onDrop(e) {
    let cardProps = e.dataTransfer.getData("text").split(",");
    let myCard = {
      type: cardProps[0],
      suite: cardProps[1],
      color: cardProps[2],
      weight: cardProps[3]
    };
    console.log(myCard);
    add(myCard);
  }

  // function getLastCard() {
  //   return this.state.cards[this.state.cards.length - 1];
  // }

  //NE MARCHE PAS: peut etre lié au fait qu'on ne peut pas déplacer de cartes de la droite vers la gauche ?

  function add(card) {
    console.log("adding...")
    if (cards.length === 0 && card.type === "ace") {
      let newCards = cards;
      newCards.push(card);
      setCards(newCards);
      console.log("ace added");
    }
    // else if (
    //   cards.length > 0 &&
    //   card.greaterThan(this.getLastCard()) &&
    //   card.suite === this.getLastCard().suite
    // ) {
    //   let newCards = this.state.cards;
    //   newCards.push(card);
    //   this.setState({
    //     cards: newCards
    //   });
    //   return true;
    // }
  }

  return (
    <div
      className="topslot"
      style={{
        height: "96px",
        display: "flex",
      }}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {cards.length === 0 ? <img src={emptyBackground} alt="Slot" /> : ""}
      {cards.map((item, index) => {
        return item;
      })}
    </div>
  );
}

export default Topslot;
