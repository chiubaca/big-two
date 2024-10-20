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
   * We build up an hashmap to count unique card values
   * the end object will looks something like:
   * {
   *   "K":2,
   *   "5": 3
   * }
   */
  const valueCounts: { [key: string]: number } = {};
  for (const card of cardCombo) {
    valueCounts[card.value] = (valueCounts[card.value] || 0) + 1;
    /**
     * Here we convert the hashmap key into array, e.g: [K,5]
     * if at any point this array becomes greater than 2 we can exit early.
     */
    if (Object.keys(valueCounts).length > 2) return false;
  }

  /**
   * Here we create an array of just the counts and we check we're
   * getting a count of 2 and 3.
   */
  const counts = Object.values(valueCounts).toSorted((a, b) => a - b);
  return counts[0] === 2 && counts[1] === 3;
}

export function isFourOfAKind(cardCombo: CardCombo) {
  // all this logic is the same as isFullHouse.
  const valueCounts: { [key: string]: number } = {};
  for (const card of cardCombo) {
    valueCounts[card.value] = (valueCounts[card.value] || 0) + 1;
    /**
     * Here we convert the hashmap key into array, e.g: [K,5]
     * if at any point this array becomes greater than 2 we can exit early.
     */
    if (Object.keys(valueCounts).length > 2) return false;
  }
  const counts = Object.values(valueCounts).toSorted((a, b) => a - b);
  return counts[0] === 1 && counts[1] === 4;
}

export function validateComboType(cardCombo: Card[]): ComboType | null {
  if (cardCombo.length !== 5) return null;

  if (isFlush(cardCombo as CardCombo) && isStraight(cardCombo as CardCombo))
    return "STRAIGHT_FLUSH";
  if (isFourOfAKind(cardCombo as CardCombo)) return "FOUR_OF_A_KIND";
  if (isFullHouse(cardCombo as CardCombo)) return "FULL_HOUSE";
  if (isFlush(cardCombo as CardCombo)) return "FLUSH";
  if (isStraight(cardCombo as CardCombo)) return "STRAIGHT";
  return null;
}

export function isComboBigger(): boolean {
  return true;
}
