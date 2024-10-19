import { assertEquals } from "jsr:@std/assert@1";
import { describe, it, test } from "jsr:@std/testing/bdd";

import {
  isFlush,
  isFullHouse,
  isStraight,
  validateComboType,
  type CardCombo,
  type ComboType,
} from "./combo-validators.ts";
import type { Card } from "./card-utils.ts";

describe("isFlush", () => {
  it("validate a flush", () => {
    const tests: CardCombo[] = [
      [
        { value: "J", suit: "SPADE" },
        { value: "K", suit: "SPADE" },
        { value: "3", suit: "SPADE" },
        { value: "4", suit: "SPADE" },
        { value: "8", suit: "SPADE" },
      ],
    ];
    tests.forEach((cardCombo) => {
      const result = isFlush(cardCombo);
      assertEquals(result, true);
    });
  });
});

describe("isStraight", () => {
  it("validates a straight", () => {
    const tests: CardCombo[] = [
      [
        { value: "3", suit: "HEART" },
        { value: "4", suit: "CLUB" },
        { value: "5", suit: "DIAMOND" },
        { value: "6", suit: "SPADE" },
        { value: "7", suit: "SPADE" },
      ],
      [
        { value: "10", suit: "HEART" },
        { value: "J", suit: "CLUB" },
        { value: "Q", suit: "DIAMOND" },
        { value: "K", suit: "SPADE" },
        { value: "A", suit: "SPADE" },
      ],
    ];
    tests.forEach((cardCombo) => {
      assertEquals(isStraight(cardCombo), true);
    });
  });
});

describe("isFullHouse", () => {
  test("validates a full house", () => {
    const tests: CardCombo[] = [
      [
        { value: "J", suit: "HEART" },
        { value: "J", suit: "SPADE" },
        { value: "J", suit: "DIAMOND" },
        { value: "8", suit: "DIAMOND" },
        { value: "8", suit: "SPADE" },
      ],
    ];
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
