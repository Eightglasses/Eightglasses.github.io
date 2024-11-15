// 花色映射
export const CARD_SUITS = {
  SPADES: "♠",
  HEARTS: "♥",
  CLUBS: "♣",
  DIAMONDS: "♦",
};

// 花色英文映射
export const SUIT_MAP = {
  spades: CARD_SUITS.SPADES,
  hearts: CARD_SUITS.HEARTS,
  clubs: CARD_SUITS.CLUBS,
  diamonds: CARD_SUITS.DIAMONDS,
  // 兼容已经是符号的情况
  "♠": CARD_SUITS.SPADES,
  "♥": CARD_SUITS.HEARTS,
  "♣": CARD_SUITS.CLUBS,
  "♦": CARD_SUITS.DIAMONDS,
};

// 点数映射
export const VALUE_MAP = {
  11: "J",
  12: "Q",
  13: "K",
  14: "A",
  15: "2",
  16: "小王",
  17: "大王",
};

// 判断是否为红色花色
export const isRedSuit = (suit) => {
  return (
    suit === CARD_SUITS.HEARTS ||
    suit === CARD_SUITS.DIAMONDS ||
    suit === "hearts" ||
    suit === "diamonds"
  );
};
