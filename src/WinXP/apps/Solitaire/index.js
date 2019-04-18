import React, { useState } from "react";
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

function Solitaire(props) {
  function initGame() {
    let myGame = {
      cards: [],
      deck: [],
      slots: [],
      stacks: []
    };

    // Create the full game (52 cards) in state.cards
    const suites = ["clubs", "diamonds", "hearts", "spades"];
    const types = ["ace", "jack", "queen", "king"];

    let comparisons = {};
    let i = -1;
    let cardNum = 0,
      slotNum = 0;
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
        myGame.cards.push({
          suite: suites[suite],
          type: i,
          weight: comparisons[i],
          color: colors[suites[suite]],
          key: cardNum++
        });
      }

      for (let type in types) {
        myGame.cards.push({
          suite: suites[suite],
          type: types[type],
          weight: comparisons[types[type]],
          color: colors[suites[suite]],
          key: cardNum++
        });
      }
    }

    // Shuffle cards
    for (let i = myGame.cards.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [myGame.cards[i], myGame.cards[rand]] = [
        myGame.cards[rand],
        myGame.cards[i]
      ];
    }

    //Create the 7 stacks where the cards are (key is necessary to remove a warning error)
    for (let i = 0; i < 7; i++) {
      let stackCards = [];
      for (let j = 0; j < i + 1; j++) {
        let cardProps = myGame.cards.shift();
        stackCards.push(
          <Card
            suite={cardProps.suite}
            type={cardProps.type}
            weight={cardProps.weight}
            color={cardProps.color}
            key={cardProps.key}
            num={j}
            visible={i === j}
            slotType={"stack"}
          />
        );
      }
      myGame.stacks.push(
        <Slot type='stack' cards={stackCards} key={slotNum++} />
      );
    }

    //Create the 4 top slots to complete (key is necessary to remove a warning error)
    for (let i = 0; i < 4; i++) {
      myGame.slots.push(<Slot type='topslot' cards={[]} key={slotNum++} />);
    }

    // Stuff remaining ones into front deck
    let remainingCards = [];
    while (myGame.cards.length > 0) {
      let cardProps = myGame.cards.shift();
      remainingCards.push(
        <Card
          suite={cardProps.suite}
          type={cardProps.type}
          weight={cardProps.weight}
          color={cardProps.color}
          key={cardProps.key}
          slotType={"deck"}
        />
      );
    }
    myGame.deck.push(<Slot type='deck' cards={remainingCards} />);

    return myGame;
  }

  let newGame = initGame();

  const [cards, setCard] = useState(newGame.cards);
  const [deck, setDeck] = useState(newGame.deck);
  const [slots, setSlots] = useState(newGame.slots);
  const [stacks, setStacks] = useState(newGame.stacks);

  return (
    <div id='solitaire-game' style={gameStyle}>
      {deck[0]}
      {slots.map((item, index) => {
        return item;
      })}
      {stacks.map((item, index) => {
        return item;
      })}
    </div>
  );
}

export default Solitaire;
