export const CardType = {
  SINGLE: "SINGLE", // 单张
  PAIR: "PAIR", // 对子
  THREE: "THREE", // 三张
  THREE_WITH_ONE: "THREE_WITH_ONE", // 三带一
  THREE_WITH_PAIR: "THREE_WITH_PAIR", // 三带对
  STRAIGHT: "STRAIGHT", // 顺子
  STRAIGHT_PAIR: "STRAIGHT_PAIR", // 连对
  BOMB: "BOMB", // 炸弹
  ROCKET: "ROCKET", // 王炸
  INVALID: "INVALID", // 无效牌型
};

export function validateCards(cards, lastPlayedCards = null) {
  if (!cards || cards.length === 0) return { valid: false, pattern: null };

  const counts = getCardCounts(cards);
  const ranks = Object.keys(counts).map(Number);

  // 获取当前牌型
  let currentPattern = null;
  let isValid = true;

  // 单张
  if (cards.length === 1) {
    currentPattern = CardPatterns.SINGLE;
  }
  // 对子
  else if (cards.length === 2 && counts[cards[0].rank] === 2) {
    currentPattern = CardPatterns.PAIR;
  }
  // 王炸（大小王）
  else if (cards.length === 2 && cards.every((card) => card.rank >= 15)) {
    currentPattern = CardPatterns.ROCKET;
  }
  // 三张
  else if (cards.length === 3 && counts[cards[0].rank] === 3) {
    currentPattern = CardPatterns.TRIPLE;
  }
  // 炸弹
  else if (cards.length === 4 && counts[cards[0].rank] === 4) {
    currentPattern = CardPatterns.BOMB;
  }
  // 三带一
  else if (cards.length === 4) {
    const hasTriple = Object.values(counts).includes(3);
    const hasSingle = Object.values(counts).includes(1);
    if (hasTriple && hasSingle) {
      currentPattern = CardPatterns.TRIPLE_WITH_ONE;
    }
  }
  // 三带二
  else if (cards.length === 5) {
    const hasTriple = Object.values(counts).includes(3);
    const hasPair = Object.values(counts).includes(2);
    if (hasTriple && hasPair) {
      currentPattern = CardPatterns.TRIPLE_WITH_PAIR;
    }
  }
  // 顺子（五张或更多）
  else if (
    cards.length >= 5 &&
    Object.values(counts).every((count) => count === 1)
  ) {
    if (isSequential(ranks, cards.length)) {
      currentPattern = CardPatterns.SEQUENCE;
    }
  }
  // 连对（三对或更多）
  else if (cards.length >= 6 && cards.length % 2 === 0) {
    if (
      Object.values(counts).every((count) => count === 2) &&
      isSequential(ranks, cards.length / 2)
    ) {
      currentPattern = CardPatterns.SEQUENCE_PAIRS;
    }
  }
  // 飞机（两个或更多连续三张）
  else if (cards.length >= 6 && cards.length % 3 === 0) {
    const triples = ranks.filter((rank) => counts[rank] === 3);
    if (triples.length >= 2 && isSequential(triples, triples.length)) {
      currentPattern = CardPatterns.PLANE;
    }
  }
  // 飞机带翅膀
  else if (cards.length >= 8 && cards.length % 4 === 0) {
    const triples = ranks.filter((rank) => counts[rank] === 3);
    if (triples.length >= 2 && isSequential(triples, triples.length)) {
      const remainingCards = cards.length - triples.length * 3;
      const wings = ranks.filter(
        (rank) => counts[rank] === 1 || counts[rank] === 2
      );
      if (wings.length * (counts[wings[0]] || 0) === remainingCards) {
        currentPattern = CardPatterns.PLANE_WITH_WINGS;
      }
    }
  }

  if (!currentPattern) {
    return { valid: false, pattern: null };
  }

  // 如果没有上一手牌，直接返回当前牌型的验证结果
  if (!lastPlayedCards) {
    return { valid: true, pattern: currentPattern };
  }

  // 验证是否可以压过上一手牌
  const lastResult = validateCards(lastPlayedCards);

  // 王炸可以压任何牌
  if (currentPattern === CardPatterns.ROCKET) {
    return { valid: true, pattern: currentPattern };
  }

  // 炸弹可以压非王炸的牌
  if (
    currentPattern === CardPatterns.BOMB &&
    lastResult.pattern !== CardPatterns.ROCKET
  ) {
    if (
      lastResult.pattern !== CardPatterns.BOMB ||
      getCardsValue(cards) > getCardsValue(lastPlayedCards)
    ) {
      return { valid: true, pattern: currentPattern };
    }
  }

  // 其他情况需要牌型相同且大小更大
  if (currentPattern === lastResult.pattern) {
    return {
      valid: getCardsValue(cards) > getCardsValue(lastPlayedCards),
      pattern: currentPattern,
    };
  }

  return { valid: false, pattern: currentPattern };
}

function getCardType(cards) {
  const len = cards.length;
  if (len === 0) return CardType.INVALID;

  // 排序
  const sortedCards = [...cards].sort((a, b) => b.rank - a.rank);

  // 王炸
  if (len === 2 && sortedCards[0].rank === 16 && sortedCards[1].rank === 15) {
    return CardType.ROCKET;
  }

  // 单张
  if (len === 1) return CardType.SINGLE;

  // 对子
  if (len === 2 && sortedCards[0].rank === sortedCards[1].rank) {
    return CardType.PAIR;
  }

  // 三张
  if (
    len === 3 &&
    sortedCards[0].rank === sortedCards[1].rank &&
    sortedCards[1].rank === sortedCards[2].rank
  ) {
    return CardType.THREE;
  }

  // 炸弹
  if (
    len === 4 &&
    sortedCards[0].rank === sortedCards[1].rank &&
    sortedCards[1].rank === sortedCards[2].rank &&
    sortedCards[2].rank === sortedCards[3].rank
  ) {
    return CardType.BOMB;
  }

  // 三带一
  if (len === 4) {
    const rankCount = countRanks(sortedCards);
    const counts = Object.values(rankCount);
    if (counts.includes(3) && counts.includes(1)) {
      return CardType.THREE_WITH_ONE;
    }
  }

  // 三带对
  if (len === 5) {
    const rankCount = countRanks(sortedCards);
    const counts = Object.values(rankCount);
    if (counts.includes(3) && counts.includes(2)) {
      return CardType.THREE_WITH_PAIR;
    }
  }

  // 顺子（至少5张）
  if (len >= 5) {
    const isSequential = sortedCards.every((card, index) => {
      if (index === 0) return true;
      // 2和大小王不能参与顺子
      if (card.rank >= 15) return false;
      return sortedCards[index - 1].rank === card.rank + 1;
    });
    if (isSequential && !hasDuplicateRanks(sortedCards)) {
      return CardType.STRAIGHT;
    }
  }

  // 连对（至少3对）
  if (len >= 6 && len % 2 === 0) {
    const pairs = [];
    for (let i = 0; i < len; i += 2) {
      // 2和大小王不能参与连对
      if (sortedCards[i].rank >= 15) return CardType.INVALID;
      if (sortedCards[i].rank !== sortedCards[i + 1].rank)
        return CardType.INVALID;
      pairs.push(sortedCards[i].rank);
    }
    const isSequential = pairs.every((rank, index) => {
      if (index === 0) return true;
      return pairs[index - 1] === rank + 1;
    });
    if (isSequential) {
      return CardType.STRAIGHT_PAIR;
    }
  }

  return CardType.INVALID;
}

function getCardsValue(cards) {
  const sortedCards = [...cards].sort((a, b) => b.rank - a.rank);
  return sortedCards[0].rank;
}

// 辅助函数：统计每个点数出现的次数
function countRanks(cards) {
  const rankCount = {};
  cards.forEach((card) => {
    rankCount[card.rank] = (rankCount[card.rank] || 0) + 1;
  });
  return rankCount;
}

// 辅助函数：检查是否有重复点数
function hasDuplicateRanks(cards) {
  const ranks = cards.map((card) => card.rank);
  return new Set(ranks).size !== ranks.length;
}

// 创建一个新文件存放牌型规则
export const CardPatterns = {
  SINGLE: "single", // 单张
  PAIR: "pair", // 对子
  TRIPLE: "triple", // 三张
  TRIPLE_WITH_ONE: "triple1", // 三带一
  TRIPLE_WITH_PAIR: "triple2", // 三带二
  SEQUENCE: "sequence", // 顺子
  SEQUENCE_PAIRS: "pairs", // 连对
  PLANE: "plane", // 飞机
  PLANE_WITH_WINGS: "planeWings", // 飞机带翅膀
  BOMB: "bomb", // 炸弹
  ROCKET: "rocket", // 王炸
};

// 获取牌的数量统计
function getCardCounts(cards) {
  const counts = {};
  cards.forEach((card) => {
    counts[card.rank] = (counts[card.rank] || 0) + 1;
  });
  return counts;
}

// 检查是否是连续的牌
function isSequential(ranks, length) {
  const sortedRanks = [...new Set(ranks)].sort((a, b) => a - b);
  if (sortedRanks.length !== length) return false;

  // 2和大小王不能参与顺子
  if (sortedRanks.some((rank) => rank >= 15)) return false;

  for (let i = 1; i < sortedRanks.length; i++) {
    if (sortedRanks[i] !== sortedRanks[i - 1] + 1) return false;
  }
  return true;
}
