import { getSequenceValue, type Card } from "./big-two.ts";

export type CardCombo = [Card, Card, Card, Card, Card];

export function isFlush(cardCombo: CardCombo) {
  return cardCombo.every((card) => card.suit === cardCombo[0].suit);
}

export function isStraight(cardCombo: CardCombo) {
  // NOTE this implementation does not account for bicycle straights e.g:
  // A,2,3,4,5
  const cardValueSum = cardCombo.reduce((valueSum, currentCard) => {
    return getSequenceValue(currentCard) + valueSum;
  }, 0);
  return cardValueSum % 5 === 0;
}

export function isFullHouse(cardCombo: CardCombo) {
  /**
   * This works by grouping unique card values into an object key and storing a .
   * count of common keys. We ensure the final count properties are either 3 or 2 as
   * this is the only count combo that is a valid full house.
   */
  const valueCount: any = {};

  for (let i = 0; i < cardCombo.length; i++) {
    const currentCard = cardCombo[i];

    if (valueCount[currentCard.value] === undefined) {
      valueCount[currentCard.value] = 1;
    } else {
      valueCount[currentCard.value] = valueCount[currentCard.value] += 1;
    }
    console.log({ valueCount });
  }

  for (const valueCountKey of Object.keys(valueCount)) {
    console.log("check");
    if (valueCount[valueCountKey] === 2 || valueCount[valueCountKey] === 3) {
      continue;
    }
    return false;
  }

  return true;
}
