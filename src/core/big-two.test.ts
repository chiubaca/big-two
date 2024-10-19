import { assertEquals } from "jsr:@std/assert@1";
import { describe, it } from "jsr:@std/testing/bdd";
import {
  sortCards,
  createDeck,
  getCardRank,
  getComparisonCardValue,
  isSingleBigger,
  isPairBigger,
  type Pairs,
  type Card,
  type ComboType,
  validateComboType,
  getSequenceValue,
} from "./big-two.ts";

describe("createDeck", () => {
  const deck = createDeck();
  it("return 52 cards", () => {
    assertEquals(deck.length, 52);
  });
});

describe("getCardRank", () => {
  const tests: [Card, number][] = [
    [{ value: "3", suit: "DIAMOND" }, 1],
    [{ value: "3", suit: "CLUB" }, 2],
    [{ value: "3", suit: "HEART" }, 3],
    [{ value: "3", suit: "SPADE" }, 4],
    [{ value: "4", suit: "DIAMOND" }, 5],
    [{ value: "4", suit: "CLUB" }, 6],
    [{ value: "4", suit: "HEART" }, 7],
    [{ value: "2", suit: "SPADE" }, 52],
  ];

  tests.forEach(([card, expectedValue]) => {
    const result = getCardRank(card);
    assertEquals(result, expectedValue);
  });
});

describe("compareCards", () => {
  it("Base cards are higher than comparison cards", () => {
    const tests: [Card, Card, number][] = [
      [{ value: "3", suit: "CLUB" }, { value: "3", suit: "DIAMOND" }, 1],
      [{ value: "3", suit: "HEART" }, { value: "3", suit: "DIAMOND" }, 2],
      [{ value: "3", suit: "SPADE" }, { value: "3", suit: "DIAMOND" }, 3],
      [{ value: "4", suit: "CLUB" }, { value: "3", suit: "DIAMOND" }, 5],
      [{ value: "2", suit: "SPADE" }, { value: "3", suit: "DIAMOND" }, 51],
    ];
    tests.forEach(([baseCard, comparisonCard, expectedValue]) => {
      const result = getComparisonCardValue(baseCard, comparisonCard);
      assertEquals(result, expectedValue);
    });
  });
  it("Base cards are  lower than comparison cards", () => {
    const tests: [Card, Card, number][] = [
      [{ value: "3", suit: "DIAMOND" }, { value: "3", suit: "CLUB" }, -1],
      [{ value: "3", suit: "DIAMOND" }, { value: "3", suit: "HEART" }, -2],
      [{ value: "3", suit: "DIAMOND" }, { value: "3", suit: "SPADE" }, -3],
      [{ value: "3", suit: "DIAMOND" }, { value: "4", suit: "CLUB" }, -5],
      [{ value: "3", suit: "DIAMOND" }, { value: "2", suit: "SPADE" }, -51],
    ];
    tests.forEach(([baseCard, comparisonCard, expectedValue]) => {
      const result = getComparisonCardValue(baseCard, comparisonCard);
      assertEquals(result, expectedValue);
    });
  });
});

describe("sortCards", () => {
  it("should sort cards with all the same suit", () => {
    const result = sortCards([
      { suit: "DIAMOND", value: "2" },
      { suit: "DIAMOND", value: "5" },
      { suit: "DIAMOND", value: "7" },
      { suit: "DIAMOND", value: "K" },
      { suit: "DIAMOND", value: "6" },
    ]);

    const expectedValue = [
      { suit: "DIAMOND", value: "5" },
      { suit: "DIAMOND", value: "6" },
      { suit: "DIAMOND", value: "7" },
      { suit: "DIAMOND", value: "K" },
      { suit: "DIAMOND", value: "2" },
    ];

    assertEquals(result, expectedValue);
  });

  it("should sort cards with different suits", () => {
    const result = sortCards([
      { suit: "HEART", value: "A" },
      { suit: "SPADE", value: "K" },
      { suit: "CLUB", value: "Q" },
      { suit: "DIAMOND", value: "J" },
      { suit: "HEART", value: "10" },
    ]);

    const expectedValue = [
      { suit: "HEART", value: "10" },
      { suit: "DIAMOND", value: "J" },
      { suit: "CLUB", value: "Q" },
      { suit: "SPADE", value: "K" },
      { suit: "HEART", value: "A" },
    ];

    assertEquals(result, expectedValue);
  });

  it("should sort cards with same values but different suits", () => {
    const result = sortCards([
      { suit: "SPADE", value: "7" },
      { suit: "CLUB", value: "7" },
      { suit: "DIAMOND", value: "7" },
      { suit: "HEART", value: "7" },
    ]);

    const expectedValue = [
      { suit: "DIAMOND", value: "7" },
      { suit: "CLUB", value: "7" },
      { suit: "HEART", value: "7" },
      { suit: "SPADE", value: "7" },
    ];

    assertEquals(result, expectedValue);
  });

  it("should handle empty array", () => {
    const result = sortCards([]);
    assertEquals(result, []);
  });

  it("should handle single card array", () => {
    const result = sortCards([{ suit: "HEART", value: "A" }]);
    assertEquals(result, [{ suit: "HEART", value: "A" }]);
  });
});

describe("isSingleBigger", () => {
  it("Base cards are higher than comparison cards", () => {
    const tests: [Card, Card, boolean][] = [
      [{ value: "A", suit: "HEART" }, { value: "K", suit: "SPADE" }, true],
      [{ value: "J", suit: "CLUB" }, { value: "10", suit: "HEART" }, true],
      [{ value: "Q", suit: "DIAMOND" }, { value: "J", suit: "SPADE" }, true],
      [{ value: "2", suit: "CLUB" }, { value: "A", suit: "HEART" }, true],
      [{ value: "5", suit: "SPADE" }, { value: "5", suit: "HEART" }, true],
      [{ value: "8", suit: "DIAMOND" }, { value: "7", suit: "CLUB" }, true],
      [{ value: "K", suit: "SPADE" }, { value: "K", suit: "HEART" }, true],
    ];
    tests.forEach(([baseCard, comparisonCard, expectedValue]) => {
      const result = isSingleBigger(baseCard, comparisonCard);
      assertEquals(result, expectedValue);
    });
  });
  it("Base cards are lower than or equal to comparison cards", () => {
    const tests: [Card, Card, boolean][] = [
      [{ value: "K", suit: "SPADE" }, { value: "A", suit: "HEART" }, false],
      [{ value: "10", suit: "HEART" }, { value: "J", suit: "CLUB" }, false],
      [{ value: "J", suit: "SPADE" }, { value: "Q", suit: "DIAMOND" }, false],
      [{ value: "A", suit: "HEART" }, { value: "2", suit: "CLUB" }, false],
      [{ value: "5", suit: "HEART" }, { value: "5", suit: "SPADE" }, false],
      [{ value: "7", suit: "CLUB" }, { value: "8", suit: "DIAMOND" }, false],
      [{ value: "K", suit: "HEART" }, { value: "K", suit: "SPADE" }, false],
    ];
    tests.forEach(([baseCard, comparisonCard, expectedValue]) => {
      const result = isSingleBigger(baseCard, comparisonCard);
      assertEquals(result, expectedValue);
    });
  });
});

describe("isDoubleBigger", () => {
  it("base double is higher than comparison double", () => {
    const tests: [Pairs, Pairs, boolean][] = [
      [
        [
          { value: "A", suit: "HEART" },
          { value: "A", suit: "SPADE" },
        ],
        [
          { value: "K", suit: "DIAMOND" },
          { value: "K", suit: "CLUB" },
        ],
        true,
      ],
      [
        [
          { value: "2", suit: "CLUB" },
          { value: "2", suit: "DIAMOND" },
        ],
        [
          { value: "A", suit: "HEART" },
          { value: "A", suit: "SPADE" },
        ],
        true,
      ],
      [
        [
          { value: "J", suit: "SPADE" },
          { value: "J", suit: "HEART" },
        ],
        [
          { value: "10", suit: "CLUB" },
          { value: "10", suit: "DIAMOND" },
        ],
        true,
      ],
      [
        [
          { value: "Q", suit: "DIAMOND" },
          { value: "Q", suit: "CLUB" },
        ],
        [
          { value: "J", suit: "SPADE" },
          { value: "J", suit: "HEART" },
        ],
        true,
      ],
      [
        [
          { value: "8", suit: "HEART" },
          { value: "8", suit: "SPADE" },
        ],
        [
          { value: "8", suit: "DIAMOND" },
          { value: "8", suit: "CLUB" },
        ],
        true,
      ],
    ];

    tests.forEach(([basePair, comparisonPair, expectedValue]) => {
      const result = isPairBigger(basePair, comparisonPair);
      assertEquals(result, expectedValue);
    });
  });
});

describe("validateComboType", () => {
  it("can confirm the correct combo tyoe", () => {
    const tests: [Card[], ComboType][] = [
      [
        [
          { value: "J", suit: "SPADE" },
          { value: "K", suit: "SPADE" },
          { value: "3", suit: "SPADE" },
          { value: "4", suit: "SPADE" },
          { value: "8", suit: "SPADE" },
        ],
        "FLUSH",
      ],
      [
        [
          { value: "3", suit: "HEART" },
          { value: "4", suit: "CLUB" },
          { value: "5", suit: "DIAMOND" },
          { value: "6", suit: "SPADE" },
          { value: "7", suit: "SPADE" },
        ],
        "STRAIGHT",
      ],
      [
        [
          { value: "10", suit: "HEART" },
          { value: "J", suit: "CLUB" },
          { value: "Q", suit: "DIAMOND" },
          { value: "K", suit: "SPADE" },
          { value: "A", suit: "SPADE" },
        ],
        "STRAIGHT",
      ],
      [
        [
          { value: "J", suit: "HEART" },
          { value: "J", suit: "SPADE" },
          { value: "J", suit: "DIAMOND" },
          { value: "8", suit: "DIAMOND" },
          { value: "8", suit: "SPADE" },
        ],
        "FULL_HOUSE",
      ],
      // [
      //   [
      //     { value: "J", suit: "DIAMOND" },
      //     { value: "J", suit: "CLUB" },
      //     { value: "J", suit: "DIAMOND" },
      //     { value: "J", suit: "DIAMOND" },
      //     { value: "8", suit: "SPADE" },
      //   ],
      //   "FOUR_OF_A_KIND",
      // ],
      // tests for royal flush
    ];

    tests.forEach(([cardCombo, expectedValue]) => {
      const result = validateComboType(cardCombo);
      assertEquals(result, expectedValue);
    });
  });
});
