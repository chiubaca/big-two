const suits = ["DIAMOND", "CLUB", "HEART", "SPADE"] as const;
const value = [
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
  "2",
] as const;

export type Card = {
  suit: (typeof suits)[number];
  value: (typeof value)[number];
};

export type Pairs = [Card, Card];

type RoundMode = "single" | "pairs" | "combo";

/**
 * Creates a standard deck of 52 playing cards for the Big Two game.
 *
 * This function generates a complete deck by combining each suit with each value.
 * The deck is created in a specific order:
 * - Suits: DIAMOND, CLUB, HEART, SPADE
 * - Values: 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A, 2
 *
 * @returns An array of 52 `Card` objects, each representing a unique card in the deck.
 */
export function createDeck(): Card[] {
  return suits.flatMap((suit) => value.map((value) => ({ suit, value })));
}

/**
 * Returns the rank of a specific card, 1 being the lowest (3 of Diamond) and
 * 52 being the highest (2 of Spades).
 * @param card A Card to get the rank for
 * @returns A number representing the rank of the card
 */
export function getCardRank(card: Card): number {
  const suitIndex = suits.indexOf(card.suit) + 1;
  const valueStep = value.indexOf(card.value) * 4;
  return valueStep + suitIndex;
}

/**
 * Compares the rank and suit of two cards and returns a numeric value representing their relative order.
 *
 * The returned value is:
 * - Positive if `baseCard` is greater than `comparisonCard`
 * - Negative if `baseCard` is less than `comparisonCard`
 * - Zero if the cards have the same rank and suit
 *
 * The comparison first looks at the value of the cards, and if the values are the same, it compares the suits.
 *
 * @param baseCard The card to compare against.
 * @param comparisonCard The card to compare to the `baseCard`.
 * @returns A number representing the relative order of the two cards.
 */
export function getComparisonCardValue(
  baseCard: Card,
  comparisonCard: Card
): number {
  return getCardRank(baseCard) - getCardRank(comparisonCard);
}

/**
 * Sorts an array of `Card` objects in ascending order based on their rank.
 *
 * The rank of a card is determined by the `getCardRank` function, which takes into account both the card's value and suit.
 *
 * @param cards An array of `Card` objects to be sorted.
 * @returns A new array of `Card` objects sorted in ascending order.
 */
export function sortCards(cards: Card[]): Card[] {
  return cards.sort((a, b) => getCardRank(a) - getCardRank(b));
}

export function isSingleBigger(baseCard: Card, comparisonCard: Card): boolean {
  return getComparisonCardValue(baseCard, comparisonCard) > 0;
}

export function isPairBigger(basePair: Pairs, comparisonPair: Pairs): boolean {
  const highestCardInBasePair = sortCards(basePair)[1];
  const highestCardInComparisonPair = sortCards(comparisonPair)[1];
  return isSingleBigger(highestCardInBasePair, highestCardInComparisonPair);
}

export function isComboBigger(): boolean {
  return true;
}
