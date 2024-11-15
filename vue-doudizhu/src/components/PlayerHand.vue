<template>
  <div class="player-hand">
    <div
      v-for="(card, index) in cards"
      :key="index"
      class="card-wrapper"
      :class="{ selected: selectedCards.includes(card) }"
      @click="handleCardClick(card)"
      :style="{ zIndex: index }"
    >
      <Card :card="card" :isOpponent="isOpponent" />
    </div>
  </div>
</template>

<script>
import Card from "./game/Card.vue";

export default {
  name: "PlayerHand",
  components: {
    Card,
  },
  props: {
    cards: {
      type: Array,
      required: true,
    },
    selectedCards: {
      type: Array,
      default: () => [],
    },
    isOpponent: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleCardClick(card) {
      if (this.isOpponent) return; // 对手的牌不能点击
      this.$emit("card-click", card);
    },
  },
};
</script>

<style scoped>
.player-hand {
  display: flex;
  justify-content: center;
  position: relative;
}

.card-wrapper {
  margin-right: -0.5rem;
  position: relative;
  transition: transform 0.2s;
  cursor: pointer;
}

.card-wrapper:last-child {
  margin-right: 0;
}

.card-wrapper.selected {
  transform: translateY(-0.2rem);
}

/* 对手的牌不能点击 */
.card-wrapper[data-opponent="true"] {
  cursor: default;
}
</style>
