import React, { Component } from "react";
import emptyBackground from "../../../assets/solitaire/empty.png";

class Slot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      type: this.props.type
    };
    this.getLastCard = this.getLastCard.bind(this);
    this.add = this.add.bind(this);
    this.addFirstTime = this.addFirstTime.bind(this);
    for (let i = 0; i < this.props.cards.length; i++) {
      this.addFirstTime(this.props.cards[i], i);
    }
  }

  getLastCard() {
    return this.state.cards[this.state.cards.length - 1];
  }

  addFirstTime(card, index) {
    let myCard = React.cloneElement(card, { slotType: this.state.type });
    let newCards = this.state.cards;
    newCards.push(myCard);
    this.setState({
      cards: newCards
    });
  }

  add(card) {
    // If this is a top slot, allow if the card being
    // added is greater than the last in our stack, starting
    // with Ace
    if (this.state.type === "topslot") {
      if (this.state.cards.length === 0 && card.props.type === "ace") {
        let newCards = this.state.cards;
        newCards.push(card);
        this.setState({
          cards: newCards
        });
        return true;
      }
      if (
        this.state.cards.length > 0 &&
        card.greaterThan(this.getLastCard()) &&
        card.suite === this.getLastCard().suite
      ) {
        let newCards = this.state.cards;
        newCards.push(card);
        this.setState({
          cards: newCards
        });
        return true;
      }
    }
    // If this is a stack, allow if card being added is less
    // than last in our stack, starting with King. Also alternate
    // colors
    else if (this.state.type === "stack") {
      if (this.state.cards.length === 0 && card.props.type === "king") {
        let newCards = this.state.cards;
        newCards.push(card);
        this.setState({
          cards: newCards
        });
        return true;
      }
      if (
        this.state.cards.length > 0 &&
        (card.weight < this.getLastCard().weight &&
          this.getLastCard().weight - card.weight === 1) &&
        card.getColor() !== this.getLastCard().getColor()
      ) {
        let newCards = this.state.cards;
        newCards.push(card);
        this.setState({
          cards: newCards
        });
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <div
        className={this.state.type}
        style={{
          height: "96px",
          gridColumn: this.state.type === "deck" ? "auto / span 3" : "",
          display: "flex"
        }}
      >
        {this.state.type !== "stack" ? (
          <img src={emptyBackground} alt='Slot' />
        ) : (
          ""
        )}
        {this.state.cards.map((item, index) => {
          return item;
        })}
      </div>
    );
  }
}

export default Slot;
