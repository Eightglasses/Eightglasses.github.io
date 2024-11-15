<template>
  <div class="card" :class="[suitClass, { 'is-opponent': isOpponent }]">
    <div class="card-inner">
      <div class="card-corner top-left">
        <div class="corner-rank">{{ displayRank }}</div>
        <div class="corner-suit" v-if="!isJoker">{{ suitSymbol }}</div>
      </div>

      <div class="card-center">
        <div class="center-suit" v-if="!isJoker">{{ suitSymbol }}</div>
        <div class="card-joker" v-if="isJoker">{{ jokerText }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    card: {
      type: Object,
      required: true,
    },
    isOpponent: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isJoker() {
      return this.card.suit === "joker";
    },
    suitClass() {
      return {
        red: ["hearts", "diamonds"].includes(this.card.suit),
        black: ["clubs", "spades"].includes(this.card.suit),
        joker: this.isJoker,
      };
    },
    suitSymbol() {
      const symbols = {
        hearts: "♥",
        diamonds: "♦",
        clubs: "♣",
        spades: "♠",
      };
      return symbols[this.card.suit] || "";
    },
    displayRank() {
      if (this.isJoker) return "";

      const rankMap = {
        11: "J",
        12: "Q",
        13: "K",
        14: "A",
        15: "小",
        16: "大",
      };
      return rankMap[this.card.rank] || this.card.rank.toString();
    },
    jokerText() {
      return this.card.rank === 16 ? "大王" : "小王";
    },
  },
};
</script>

<style scoped>
.card {
  width: 0.8rem;
  height: 1.12rem;
  background: white;
  border-radius: 0.08rem;
  border: 0.01rem solid #ccc;
  position: relative;
  box-shadow: 0 0.02rem 0.04rem rgba(0, 0, 0, 0.1);
  user-select: none;
}

.card-inner {
  position: relative;
  height: 100%;
  box-sizing: border-box;
  padding: 0.06rem;
}

.card-corner {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
}

.top-left {
  top: 0.06rem;
  left: 0.06rem;
}

.corner-rank {
  font-size: 0.2rem;
  font-weight: bold;
}

.corner-suit {
  font-size: 0.2rem;
  margin-top: 0.02rem;
}

.card-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.center-suit {
  font-size: 0.4rem;
  line-height: 1;
}

.card-joker {
  font-size: 0.28rem;
  font-weight: bold;
  white-space: nowrap;
}

.red {
  color: #e40000;
}

.black {
  color: #000000;
}

.joker {
  color: #e40000;
}

.joker:nth-child(even) {
  color: #000000;
}

.is-opponent {
  background: linear-gradient(45deg, #1a237e, #3949ab);
  color: transparent;
}

.is-opponent .card-inner {
  display: none;
}

.card:not(.is-opponent):hover {
  transform: translateY(-0.02rem);
  box-shadow: 0 0.04rem 0.08rem rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}
</style>
