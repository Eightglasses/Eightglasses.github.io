<template>
  <div class="played-cards">
    <div class="cards-container" v-if="cards.length > 0">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="card"
        :class="{ 'red-card': isRedCard(card) }"
      >
        <div class="card-corner">
          <span class="card-value">{{ formatCardValue(card) }}</span>
          <span class="card-suit">{{ formatCardSuit(card) }}</span>
        </div>
      </div>
    </div>
    <div v-else class="empty-hint">等待出牌...</div>
  </div>
</template>

<script>
import { SUIT_MAP, VALUE_MAP, isRedSuit } from "@/constants/cards";

export default {
  name: "PlayedCards",
  props: {
    cards: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    isRedCard(card) {
      return isRedSuit(card.suit);
    },
    formatCardValue(card) {
      return VALUE_MAP[card.rank] || card.rank;
    },
    formatCardSuit(card) {
      if (card.rank >= 16) return ""; // 大小王不显示花色
      return SUIT_MAP[card.suit] || card.suit;
    },
  },
};
</script>

<style scoped>
.played-cards {
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem;
}

.cards-container {
  display: flex;
  gap: 0.1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  width: 1rem;
  height: 1.5rem;
  border: 0.02rem solid #ddd;
  border-radius: 0.08rem;
  background: white;
  position: relative;
  box-shadow: 0 0.02rem 0.04rem rgba(0, 0, 0, 0.1);
  color: #333;
}

.card-corner {
  position: absolute;
  top: 0.08rem;
  left: 0.08rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
}

.card-value {
  font-size: 0.32rem;
  font-weight: bold;
}

.card-suit {
  font-size: 0.32rem;
  margin-top: 0.02rem;
}

.red-card {
  color: #ff4d4f;
}

.empty-hint {
  color: #999;
  font-size: 0.28rem;
}
</style>
