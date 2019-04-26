import React, { useState } from "react";
import Card from "./Card";
import Topslot from "./Topslot";
import Deck from "./Deck";
import Stack from "./Stack";

const gameStyle = {
  width: "594px",
  height: "369px",
  backgroundColor: "rgb(0,128,1)",
  display: "grid",
  gridTemplateColumns: "71px 71px 71px 71px 71px 71px 71px",
  gridTemplateRows: "96px 192px",
  gridColumnGap: "12.5px",
  gridRowGap: "7px",
  paddingLeft: "8px",
  paddingTop: "3px",
};

function Solitaire(props) {
  function initGame() {
    let myGame = {
      cards: [],
      deck: [],
      slots: [],
      stacks: [],
    };

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
      hearts: "red",
    };

    for (let suite in suites) {
      for (let i = 2; i <= 10; i++) {
        myGame.cards.push({
          suite: suites[suite],
          type: i,
          weight: comparisons[i],
          color: colors[suites[suite]],
        });
      }

      for (let type in types) {
        myGame.cards.push({
          suite: suites[suite],
          type: types[type],
          weight: comparisons[types[type]],
          color: colors[suites[suite]],
        });
      }
    }

    // Shuffle cards
    // for (let i = myGame.cards.length - 1; i > 0; i--) {
    //   const rand = Math.floor(Math.random() * (i + 1));
    //   [myGame.cards[i], myGame.cards[rand]] = [
    //     myGame.cards[rand],
    //     myGame.cards[i],
    //   ];
    // }

    //Create the 7 stacks where the cards are
    for (let i = 0; i < 7; i++) {
      let stacksCards = [];
      for (let j = 0; j < i + 1; j++) {
        let cardProps = myGame.cards.shift();
        stacksCards.push(
          <Card
            suite={cardProps.suite}
            type={cardProps.type}
            weight={cardProps.weight}
            color={cardProps.color}

            num={j}
            row={i}
            slotType={"stack"}
            visible={i === j}

            key={`card-${cardProps.suite}-${cardProps.type}`}
          />,
        );
      }
      myGame.stacks.push(<Stack cards={stacksCards} key={`slot-${i}`} cardDropping={cardDropping} row={i} />)
    }

    //Create the 4 top slots to complete
    for (let i = 0; i < 4; i++) {
      myGame.slots.push(<Topslot cards={[]} key={`topslot-${i}`} />);
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
          slotType={"deck"}
          key={`card-${cardProps.suite}-${cardProps.type}`}
        />,
      );
    }
    myGame.deck.push(<Deck cards={remainingCards} />);

    return myGame;
  }

  const newGame = initGame();

  const [deck, setDeck] = useState(newGame.deck);
  const [slots, setSlots] = useState(newGame.slots);
  const [stacks, setStacks] = useState(newGame.stacks);

  //Pb: When a card is moved, last move is cancelled.... Pb with setStacks ?

  function cardDropping(initNum, lastNum) {
    //Select the card that is moving
    let stacksCopy = stacks.slice();
    let cardProps = stacksCopy[initNum].props.cards[stacksCopy[initNum].props.cards.length - 1].props;

    let lastCards = stacksCopy[lastNum].props.cards.slice();
    lastCards.push(<Card
      suite={cardProps.suite}
      type={cardProps.type}
      weight={cardProps.weight}
      color={cardProps.color}

      num={stacks[lastNum].props.cards.length}
      row={lastNum}
      slotType={"stack"}
      visible={true}

      key={`card-${cardProps.suite}-${cardProps.type}`}
    />)
    let initCards = stacksCopy[initNum].props.cards.slice();
    initCards.pop();

    stacksCopy[initNum] = <Stack cards={initCards} row={initNum} cardDropping={cardDropping} key={`slot-${initNum}`} />
    stacksCopy[lastNum] = <Stack cards={lastCards} row={lastNum} cardDropping={cardDropping} key={`slot-${lastNum}`} />

    console.log(stacks.map((stack) => stack.props.cards));
    setStacks(stacksCopy);
    console.log(stacks.map((stack) => stack.props.cards));
  }

  return (
    <div id="solitaire-game" style={gameStyle}>
      {deck[0]}
      {slots}
      {stacks}
    </div>
  );
}

export default Solitaire;
