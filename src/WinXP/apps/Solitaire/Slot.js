import React, { useState } from "react";
import emptyBackground from "../../../assets/solitaire/empty.png";

function Slot(props) {
  // let myCard = React.cloneElement(card, { slotType: this.state.type });

  const [cards, setCard] = useState(props.cards);
  const slotType = props.type;

  // function getLastCard() {
  //   return this.state.cards[this.state.cards.length - 1];
  // }

  // function add(card) {
  //   // If this is a top slot, allow if the card being
  //   // added is greater than the last in our stack, starting
  //   // with Ace
  //   if (this.state.type === "topslot") {
  //     if (this.state.cards.length === 0 && card.props.type === "ace") {
  //       let newCards = this.state.cards;
  //       newCards.push(card);
  //       this.setState({
  //         cards: newCards
  //       });
  //       return true;
  //     }
  //     if (
  //       this.state.cards.length > 0 &&
  //       card.greaterThan(this.getLastCard()) &&
  //       card.suite === this.getLastCard().suite
  //     ) {
  //       let newCards = this.state.cards;
  //       newCards.push(card);
  //       this.setState({
  //         cards: newCards
  //       });
  //       return true;
  //     }
  //   }
  //   // If this is a stack, allow if card being added is less
  //   // than last in our stack, starting with King. Also alternate
  //   // colors
  //   else if (this.state.type === "stack") {
  //     if (this.state.cards.length === 0 && card.props.type === "king") {
  //       let newCards = this.state.cards;
  //       newCards.push(card);
  //       this.setState({
  //         cards: newCards
  //       });
  //       return true;
  //     }
  //     if (
  //       this.state.cards.length > 0 &&
  //       (card.weight < this.getLastCard().weight &&
  //         this.getLastCard().weight - card.weight === 1) &&
  //       card.getColor() !== this.getLastCard().getColor()
  //     ) {
  //       let newCards = this.state.cards;
  //       newCards.push(card);
  //       this.setState({
  //         cards: newCards
  //       });
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  return (
    <div
      className={slotType}
      style={{
        height: "96px",
        gridColumn: slotType === "deck" ? "auto / span 3" : "",
        display: "flex"
      }}
    >
      {slotType !== "stack" ? <img src={emptyBackground} alt='Slot' /> : ""}
      {cards.map((item, index) => {
        return item;
      })}
    </div>
  );
}

export default Slot;
