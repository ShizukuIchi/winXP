import React, { Component } from "react";
import Card from "./Card";
import Slot from "./Slot";

const gameStyle = {
  width: "594px",
  height: "369px",
  backgroundColor: "rgb(0,128,1)",
  display: "grid",
  gridTemplateColumns: "71px 71px 71px 71px 71px 71px 71px",
  gridTemplateRows: "96px 96px",
  gridColumnGap: "12.5px",
  gridRowGap: "7px",
  paddingLeft: "8px",
  paddingTop: "3px"
};

class Solitaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      deck: [],
      slots: [],
      stacks: []
    };
    this.restart = this.restart.bind(this);
    this.restart();
  }

  restart() {
    this.setState({
      cards: [],
      deck: [],
      slots: [],
      stacks: []
    });

    // Create the full game (52 cards) in state.cards
    const suites = ["clubs", "diamonds", "hearts", "spades"];
    const types = ["ace", "jack", "queen", "king"];

    let comparisons = {};
    let i = -1;
    comparisons["ace"] = ++i;
    for (let j = 2; j <= 10; j++) {
      comparisons[j] = ++i;
    }
    comparisons["jack"] = ++i;
    comparisons["queen"] = ++i;
    comparisons["king"] = ++i;

    let colors = {
      clubs: "black",
      spades: "black",
      diamonds: "red",
      hearts: "red"
    };

    for (let suite in suites) {
      for (let i = 2; i <= 10; i++) {
        let newCards = this.state.cards;
        newCards.push(
          <Card
            suite={suites[suite]}
            type={i}
            weight={comparisons[i]}
            color={colors[suites[suite]]}
          />
        );
        this.setState({ cards: newCards });
      }

      for (let type in types) {
        let newCards = this.state.cards;
        newCards.push(
          <Card
            suite={suites[suite]}
            type={types[type]}
            weight={comparisons[types[type]]}
            color={colors[suites[suite]]}
          />
        );
        this.setState({ cards: newCards });
      }
    }

    // Shuffle cards
    const newCards = this.state.cards;
    for (let i = newCards.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newCards[i], newCards[rand]] = [newCards[rand], newCards[i]];
    }
    this.setState({ cards: newCards });

    //Create the 7 stacks where the cards are (key is necessary to remove a warning error)
    for (let i = 0; i < 7; i++) {
      let stackCards = [];
      for (let j = 0; j < i + 1; j++) {
        let myCard = React.cloneElement(this.state.cards.shift(), {
          lastCard: i === j,
          num: j
        });
        stackCards.push(myCard);
      }
      let newStacks = this.state.stacks;
      newStacks.push(<Slot type='stack' cards={stackCards} key={i} />);
      this.setState({ stacks: newStacks });
    }

    //Create the 4 top slots to complete (key is necessary to remove a warning error)
    for (let i = 0; i < 4; i++) {
      let newSlot = this.state.slots;
      newSlot.push(<Slot type='topslot' cards={[]} key={i} />);
      this.setState({ slots: newSlot });
    }

    // Stuff remaining ones into front deck
    let remainingCards = [];
    while (this.state.cards.length > 0) {
      remainingCards.push(this.state.cards.shift());
    }
    let newDeck = this.state.deck;
    newDeck.push(<Slot type='deck' cards={remainingCards} />);
    this.setState({ deck: newDeck });

    console.log(this.state);
  }

  render() {
    return (
      <div id='solitaire-game' style={gameStyle}>
        {this.state.deck[0]}
        {this.state.slots.map((item, index) => {
          return item;
        })}
        {this.state.stacks.map((item, index) => {
          return item;
        })}
      </div>
    );
  }
}

export default Solitaire;
