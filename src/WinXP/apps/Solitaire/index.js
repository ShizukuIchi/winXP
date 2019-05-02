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
            numVisible={0}

            checkLastCard={checkLastCard}

            key={`card-${cardProps.suite}-${cardProps.type}`}
          />,
        );
      }
      myGame.stacks.push(<Stack cards={stacksCards} key={`stack-${i}`} cardDropping={cardDroppingStacks} row={i} />)
    }

    //Create the 4 top slots to complete
    for (let i = 0; i < 4; i++) {
      myGame.slots.push(<Topslot cards={[]} row={i} key={`topslot-${i}`} cardDropping={cardDroppingSlots} />);
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

          visible={false}
          slotType={"deck"}

          key={`card-${cardProps.suite}-${cardProps.type}`}
        />,
      );
    }
    myGame.deck.push(<Deck cards={remainingCards} onClick={clickOnDeck} />);

    return myGame;
  }

  const newGame = initGame();

  const [cards, setCards] = useState(newGame.cards);
  const [deck, setDeck] = useState(newGame.deck);
  const [slots, setSlots] = useState(newGame.slots);
  const [stacks, setStacks] = useState(newGame.stacks);

  //Allows us to make several things (do more than one move, check if a card is the last card of a stack, ...), for an unknown reason (yet)
  let currentCards = cards.slice();
  let currentDeck = deck.slice();
  let currentStacks = stacks.slice();
  let currentSlots = slots.slice();

  function checkLastCard(row, num) {
    return (num === currentStacks[row].props.cards.length - 1);
  }

  function cardDroppingStacks(initNum, lastNum, slotType) {
    if (slotType === "stack") {
      //Select the card that is moving
      let stacksCopy = currentStacks.slice();
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
        numVisible={cardProps.numVisible + 1}

        checkLastCard={checkLastCard}

        key={`card-${cardProps.suite}-${cardProps.type}`}
      />)
      let initCards = stacksCopy[initNum].props.cards.slice();
      initCards.pop();

      stacksCopy[initNum] = <Stack cards={initCards} row={initNum} cardDropping={cardDroppingStacks} key={`stack-${initNum}`} />
      stacksCopy[lastNum] = <Stack cards={lastCards} row={lastNum} cardDropping={cardDroppingStacks} key={`stack-${lastNum}`} />

      setStacks(stacksCopy);
      currentStacks = stacksCopy;
    }
    else if (slotType === "deck") {

    }
  }

  function cardDroppingSlots(initNum, slotNum) {
    //I will need to implement the drop from the three different sources : slots, stacks & deck. 
    let stacksCopy = currentStacks.slice();
    let slotsCopy = currentSlots.slice();
    let cardProps = stacksCopy[initNum].props.cards[stacksCopy[initNum].props.cards.length - 1].props;

    let slotCards = slotsCopy[slotNum].props.cards.slice();
    slotCards.push(<Card
      suite={cardProps.suite}
      type={cardProps.type}
      weight={cardProps.weight}
      color={cardProps.color}

      row={slotNum}
      slotType={"topslot"}
      visible={true}

      checkLastCard={checkLastCard}

      key={`card-${cardProps.suite}-${cardProps.type}`}
    />)
    let initCards = stacksCopy[initNum].props.cards.slice();
    initCards.pop();

    stacksCopy[initNum] = <Stack cards={initCards} row={initNum} cardDropping={cardDroppingStacks} key={`slot-${initNum}`} />
    slotsCopy[slotNum] = <Topslot cards={slotCards} row={slotNum} cardDropping={cardDroppingSlots} key={`topslot-${slotNum}`} />

    setStacks(stacksCopy);
    currentStacks = stacksCopy;
    setSlots(slotsCopy);
    currentSlots = slotsCopy;
  }

  function clickOnDeck() {
    if (currentDeck[0].props.cards.length > 0) {
      let deckCopy = currentDeck.slice();
      let cardsCopy = currentCards.slice();
      let cardProps = deckCopy[0].props.cards[deckCopy[0].props.cards.length - 1].props;
      deckCopy[0].props.cards.pop();
      cardsCopy.push(<Card
        suite={cardProps.suite}
        type={cardProps.type}
        weight={cardProps.weight}
        color={cardProps.color}

        visible={true}
        slotType={"deck"}

        key={`card-${cardProps.suite}-${cardProps.type}`}
      />)
      deckCopy[0] = <Deck cards={deckCopy[0].props.cards} onClick={clickOnDeck} />;
      setDeck(deckCopy);
      currentDeck = deckCopy;
      setCards(cardsCopy);
      currentCards = cardsCopy;
    } else {
      let cardsCopy = currentCards.slice();
      let deckCopy = currentDeck.slice();
      let newCards = cardsCopy.map((elt) => {
        let cardProps = elt.props;
        return <Card
          suite={cardProps.suite}
          type={cardProps.type}
          weight={cardProps.weight}
          color={cardProps.color}

          visible={false}
          slotType={"deck"}

          key={`card-${cardProps.suite}-${cardProps.type}`}
        />;
      })
      deckCopy[0] = <Deck cards={newCards} onClick={clickOnDeck} />;
      setDeck(deckCopy);
      currentDeck = deckCopy;
      setCards([]);
      currentCards = [];
    }
  }

  return (
    <div id="solitaire-game" style={gameStyle}>
      {deck[0]}
      {cards}
      {slots}
      {stacks}
    </div>
  );
}

export default Solitaire;
