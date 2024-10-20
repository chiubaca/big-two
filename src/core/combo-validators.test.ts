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
} from "./combo-validators.ts";
import type { Card } from "./card-utils.ts";
import { comboStubs } from "./stubs.ts";

describe("isFlush", () => {
  it("validate a flush", () => {
    const tests: CardCombo[] = [comboStubs.FLUSH_SPADE];
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
});

describe("validateComboType", () => {
  it("can confirm the correct combo tyoe", () => {
    const tests: [Card[], ComboType][] = [
      [comboStubs.FLUSH_SPADE, "FLUSH"],
      [comboStubs.STRAIGHT_3_7, "STRAIGHT"],
      [comboStubs.STRAIGHT_10_A, "STRAIGHT"],
      [comboStubs.FULL_HOUSE_J_8, "FULL_HOUSE"],
      [comboStubs.FOUR_OF_A_KIND_J, "FOUR_OF_A_KIND"],
    ];

    tests.forEach(([cardCombo, expectedValue]) => {
      const result = validateComboType(cardCombo);
      assertEquals(result, expectedValue);
    });
  });
});
