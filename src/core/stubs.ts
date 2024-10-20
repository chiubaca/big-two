import type { CardCombo } from "./combo-validators.ts";

export const comboStubs = {
  FLUSH_SPADE: [
    { value: "J", suit: "SPADE" },
    { value: "K", suit: "SPADE" },
    { value: "3", suit: "SPADE" },
    { value: "4", suit: "SPADE" },
    { value: "8", suit: "SPADE" },
  ],
  STRAIGHT_3_7: [
    { value: "3", suit: "HEART" },
    { value: "4", suit: "CLUB" },
    { value: "5", suit: "DIAMOND" },
    { value: "6", suit: "SPADE" },
    { value: "7", suit: "SPADE" },
  ],
  STRAIGHT_10_A: [
    { value: "10", suit: "HEART" },
    { value: "J", suit: "CLUB" },
    { value: "Q", suit: "DIAMOND" },
    { value: "K", suit: "SPADE" },
    { value: "A", suit: "SPADE" },
  ],
  FULL_HOUSE_J_8: [
    { value: "J", suit: "HEART" },
    { value: "J", suit: "SPADE" },
    { value: "J", suit: "DIAMOND" },
    { value: "8", suit: "DIAMOND" },
    { value: "8", suit: "SPADE" },
  ],
  FOUR_OF_A_KIND_J: [
    { value: "J", suit: "HEART" },
    { value: "J", suit: "SPADE" },
    { value: "J", suit: "DIAMOND" },
    { value: "J", suit: "CLUB" },
    { value: "8", suit: "SPADE" },
  ],
  STRAIGHT_FLUSH_SPADE_3_7: [
    { value: "3", suit: "SPADE" },
    { value: "4", suit: "SPADE" },
    { value: "5", suit: "SPADE" },
    { value: "6", suit: "SPADE" },
    { value: "7", suit: "SPADE" },
  ],
} satisfies Record<string, CardCombo>;
