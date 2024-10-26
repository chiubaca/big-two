import { assertEquals } from "jsr:@std/assert@1";
import { describe, it, test } from "jsr:@std/testing/bdd";

import {
  isFlush,
  isStraight,
  isFullHouse,
  isFourOfAKind,
  validateComboType,
  type CardCombo,
  type ComboType,
  type ValidatedCardCombination,
  isFlushBigger,
  isStraightBigger,
  isFullHouseBigger,
  isFourOfAKindBigger,
  isStraightFlushBigger,
} from "./combo-validators.ts";
import { comboStubs } from "./stubs.ts";

describe("isFlush", () => {
  it("validate a flush", () => {
    const tests: CardCombo[] = [comboStubs.FLUSH_SPADE_K];
    tests.forEach((cardCombo) => {
      const result = isFlush(cardCombo);
      assertEquals(result, true);
    });
  });
});

describe("isStraight", () => {
  it("validates a straight", () => {
    const tests: CardCombo[] = [
      comboStubs.STRAIGHT_3_7,
      comboStubs.STRAIGHT_10_A,
    ];
    tests.forEach((cardCombo) => {
      assertEquals(isStraight(cardCombo), true);
    });
  });
});

describe("isFullHouse", () => {
  test("validates a full house", () => {
    const tests: CardCombo[] = [comboStubs.FULL_HOUSE_J_8];
    tests.forEach((cardCombo) => {
      assertEquals(isFullHouse(cardCombo), true);
    });
  });
  test("invalid full house", () => {
    const tests: CardCombo[] = [
      [
        { value: "K", suit: "HEART" },
        { value: "K", suit: "SPADE" },
        { value: "J", suit: "DIAMOND" },
        { value: "J", suit: "DIAMOND" },
        { value: "8", suit: "SPADE" },
      ],
    ];
    tests.forEach((cardCombo) => {
      assertEquals(isFullHouse(cardCombo), false);
    });
  });
});

describe("isFourOfAKind", () => {
  test("is valid four of a kind", () => {
    const tests: CardCombo[] = [comboStubs.FOUR_OF_A_KIND_J];
    tests.forEach((cardCombo) => {
      assertEquals(isFourOfAKind(cardCombo), true);
    });
  });
  test("it not a valid four of a kind", () => {
    const tests: CardCombo[] = [comboStubs.FLUSH_SPADE_K];
    tests.forEach((cardCombo) => {
      assertEquals(isFourOfAKind(cardCombo), false);
    });
  });
});

describe("validateComboType", () => {
  it("can confirm the correct combo tyoe", () => {
    const tests: [CardCombo, ComboType][] = [
      [comboStubs.FLUSH_SPADE_K, "FLUSH"],
      [comboStubs.STRAIGHT_3_7, "STRAIGHT"],
      [comboStubs.STRAIGHT_10_A, "STRAIGHT"],
      [comboStubs.FULL_HOUSE_J_8, "FULL_HOUSE"],
      [comboStubs.FOUR_OF_A_KIND_J, "FOUR_OF_A_KIND"],
      [comboStubs.STRAIGHT_FLUSH_SPADE_3_7, "STRAIGHT_FLUSH"],
    ];

    tests.forEach(([cardCombo, comboType]) => {
      const result = validateComboType(cardCombo);
      assertEquals(result, {
        type: comboType,
        cards: cardCombo,
      } satisfies ValidatedCardCombination);
    });
  });
});

describe("test combo comparisons", () => {
  test("isFlushBigger", () => {
    const tests: [CardCombo, CardCombo, boolean][] = [
      [comboStubs.FLUSH_SPADE_K, comboStubs.FLUSH_DIAMOND_Q, true],
      [comboStubs.FLUSH_HEART_2, comboStubs.FLUSH_SPADE_K, true],
      [comboStubs.FLUSH_CLUB_K, comboStubs.FLUSH_SPADE_K, false],
      [comboStubs.FLUSH_SPADE_K, comboStubs.FLUSH_SPADE_2, false],
    ];
    tests.forEach(([baseCombo, comparisonCombo, expectedResult]) => {
      const result = isFlushBigger(baseCombo, comparisonCombo);
      assertEquals(result, expectedResult);
    });
  });

  test("isStraightBigger", () => {
    const tests: [CardCombo, CardCombo, boolean][] = [
      [comboStubs.STRAIGHT_10_A, comboStubs.STRAIGHT_3_7, true],
      [comboStubs.STRAIGHT_7_J, comboStubs.STRAIGHT_5_9, true],
      [comboStubs.STRAIGHT_3_7, comboStubs.STRAIGHT_5_9, false],
    ];
    tests.forEach(([baseCombo, comparisonCombo, expectedResult]) => {
      const result = isStraightBigger(baseCombo, comparisonCombo);
      assertEquals(result, expectedResult);
    });
  });

  test("isFullHouseBigger", () => {
    const tests: [CardCombo, CardCombo, boolean][] = [
      [comboStubs.FULL_HOUSE_10_4, comboStubs.FULL_HOUSE_J_8, false],
      [comboStubs.FULL_HOUSE_A_2, comboStubs.FULL_HOUSE_K_Q, true],
      [comboStubs.FULL_HOUSE_J_8, comboStubs.FULL_HOUSE_10_4, true],
    ];
    tests.forEach(([baseCombo, comparisonCombo, expectedResult]) => {
      const result = isFullHouseBigger(baseCombo, comparisonCombo);
      assertEquals(result, expectedResult);
    });
  });

  // test("isFourOfAKindBigger", () => {
  //   const tests: [CardCombo, CardCombo, boolean][] = [
  //     [comboStubs.FOUR_OF_A_KIND_J, comboStubs.FOUR_OF_A_KIND_K, false],
  //     [comboStubs.FOUR_OF_A_KIND_A, comboStubs.FOUR_OF_A_KIND_Q, true],
  //   ];
  //   tests.forEach(([baseCombo, comparisonCombo, expectedResult]) => {
  //     const result = isFourOfAKindBigger(baseCombo, comparisonCombo);
  //     assertEquals(result, expectedResult);
  //   });
  // });

  // test("isStraightFlushBigger", () => {
  //   const tests: [CardCombo, CardCombo, boolean][] = [
  //     [
  //       comboStubs.STRAIGHT_FLUSH_CLUB_4_8,
  //       comboStubs.STRAIGHT_FLUSH_DIAMOND_9_K,
  //       true,
  //     ],
  //     [
  //       comboStubs.STRAIGHT_FLUSH_HEART_6_10,
  //       comboStubs.STRAIGHT_FLUSH_DIAMOND_9_K,
  //       true,
  //     ],
  //     [
  //       comboStubs.STRAIGHT_FLUSH_CLUB_5_9,
  //       comboStubs.STRAIGHT_FLUSH_CLUB_4_8,
  //       true,
  //     ],
  //   ];
  //   tests.forEach(([baseCombo, comparisonCombo, expectedResult]) => {
  //     const result = isStraightFlushBigger(baseCombo, comparisonCombo);
  //     assertEquals(result, expectedResult);
  //   });
  // });
});
