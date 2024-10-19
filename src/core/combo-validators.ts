import { getSequenceValue, type Card } from "./card-utils.ts";

export type CardCombo = [Card, Card, Card, Card, Card];
export type ComboType =
  | "STRAIGHT"
  | "FLUSH"
  | "FULL_HOUSE"
  | "FOUR_OF_A_KIND"
  | "STRAIGHT_FLUSH";

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
   *
   * AI can 100% build a better validator than this!!
   */
  const valueCount: any = {};

  for (let i = 0; i < cardCombo.length; i++) {
    const currentCard = cardCombo[i];

    if (valueCount[currentCard.value] === undefined) {
      valueCount[currentCard.value] = 1;
    } else {
      valueCount[currentCard.value] = valueCount[currentCard.value] += 1;
    }
  }

  const comboCheck = [];
  for (const valueCountKey of Object.keys(valueCount)) {
    if (valueCount[valueCountKey] === 2 || valueCount[valueCountKey] === 3) {
      comboCheck.push(true);
    } else {
      comboCheck.push(false);
    }
  }

  return comboCheck.every((check) => check === true);
}

export function isFourOfAKind(cardCombo: CardCombo) {
  // all this logic is the same as isFullHouse which is already bad!
  // very ripe for refactoring!!
  const valueCount: any = {};

  for (let i = 0; i < cardCombo.length; i++) {
    const currentCard = cardCombo[i];

    if (valueCount[currentCard.value] === undefined) {
      valueCount[currentCard.value] = 1;
    } else {
      valueCount[currentCard.value] = valueCount[currentCard.value] += 1;
    }
  }

  const comboCheck = [];
  for (const valueCountKey of Object.keys(valueCount)) {
    if (valueCount[valueCountKey] === 1 || valueCount[valueCountKey] === 4) {
      comboCheck.push(true);
    } else {
      comboCheck.push(false);
    }
  }

  return comboCheck.every((check) => check === true);
}

export function validateComboType(cardCombo: Card[]): ComboType | null {
  if (cardCombo.length !== 5) return null;

  if (isFlush(cardCombo as CardCombo)) return "FLUSH";
  if (isStraight(cardCombo as CardCombo)) return "STRAIGHT";
  if (isFullHouse(cardCombo as CardCombo)) return "FULL_HOUSE";
  return null;
}

export function isComboBigger(): boolean {
  return true;
}
