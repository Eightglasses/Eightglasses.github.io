<template>
  <div class="game-container">
    <!-- 左侧对手 -->
    <div class="opponent opponent-left">
      <div class="player-info">
        <div
          class="avatar"
          :style="{ backgroundColor: getAvatarColor(leftPlayer.name) }"
        >
          {{ getFirstChar(leftPlayer.name) }}
        </div>
        <span>{{ leftPlayer.name }}</span>
        <span class="card-count">剩余: {{ leftPlayerCards.length }}张</span>
      </div>
      <PlayerHand
        :cards="leftPlayerCards"
        :isOpponent="true"
        class="vertical-cards"
      />
    </div>

    <!-- 中央区域 -->
    <div class="center-area">
      <div class="last-move" v-if="lastMove">
        <span class="player-name">{{ lastMove.playerName }}</span>
        <span class="move-type">{{
          lastMove.type === "pass" ? "不出" : "出牌"
        }}</span>
      </div>
      <div class="played-cards-area">
        <PlayedCards :cards="lastPlayedCards" />
      </div>

      <div class="game-controls" v-if="isCurrentPlayer">
        <button
          class="btn play-btn"
          @click="playCards"
          :disabled="!selectedCardsValid"
        >
          出牌
        </button>
        <button class="btn pass-btn" @click="pass" v-if="canPass">不出</button>
      </div>
    </div>

    <!-- 右侧对手 -->
    <div class="opponent opponent-right">
      <div class="player-info">
        <div
          class="avatar"
          :style="{ backgroundColor: getAvatarColor(rightPlayer.name) }"
        >
          {{ getFirstChar(rightPlayer.name) }}
        </div>
        <span>{{ rightPlayer.name }}</span>
        <span class="card-count">剩余: {{ rightPlayerCards.length }}张</span>
      </div>
      <PlayerHand
        :cards="rightPlayerCards"
        :isOpponent="true"
        class="vertical-cards"
      />
    </div>

    <!-- 当前玩家区域 -->
    <div class="current-player">
      <div class="player-info">
        <div
          class="avatar"
          :style="{ backgroundColor: getAvatarColor(currentPlayer.name) }"
        >
          {{ getFirstChar(currentPlayer.name) }}
        </div>
        <span>{{ currentPlayer.name }}</span>
        <span class="card-count">剩余: {{ playerCards.length }}张</span>
      </div>
      <PlayerHand
        :cards="playerCards"
        :isOpponent="false"
        :selectedCards="selectedCards"
        @card-click="handleCardClick"
      />
    </div>
  </div>
</template>

<script>
import PlayerHand from "@/components/PlayerHand.vue";
import PlayedCards from "@/components/PlayedCards.vue";
import { useUserStore } from "@/store/user";
import { validateCards } from "@/utils/cardRules";

export default {
  name: "GameView",
  components: {
    PlayerHand,
    PlayedCards,
  },
  data() {
    return {
      playerCards: [], // 当前玩家的手牌
      leftPlayerCards: [], // 左侧玩家的手牌
      rightPlayerCards: [], // 右侧玩家的手牌
      lastPlayedCards: [], // 上一次出的牌
      selectedCards: [], // 当前选中的牌
      isCurrentPlayer: false, // 是否轮到当前玩家
      canPass: false, // 是否可以选择"不出"
      currentPlayer: {
        name: "我",
        avatar: "",
      },
      leftPlayer: {
        name: "玩家2",
        avatar: "",
      },
      rightPlayer: {
        name: "玩家3",
        avatar: "",
      },
      lastMove: null,
      currentTurn: 0, // 0: 当前玩家, 1: 左侧玩家, 2: 右侧玩家
      gameStarted: false,
      lastValidPlay: null, // 记录上一次有效的出牌
    };
  },
  computed: {
    selectedCardsValid() {
      const result = validateCards(this.selectedCards, this.lastValidPlay);
      return result.valid;
    },
    canPass() {
      // 如果是第一个出牌的人，不能不出
      // 如果上一手没有人出牌，也不能不出
      return this.lastValidPlay !== null;
    },
  },
  methods: {
    initGame() {
      // 初始化游戏
      const userStore = useUserStore();
      this.currentPlayer = userStore.userInfo;

      // 生成并发放扑克牌
      const allCards = this.generateCards();
      this.dealCards(allCards);

      this.gameStarted = true;
      this.isCurrentPlayer = true;
      this.startGameLoop();
    },

    generateCards() {
      // 生成一副扑克牌
      const suits = ["hearts", "diamonds", "clubs", "spades"];
      const cards = [];

      // 生成2-A
      for (let suit of suits) {
        for (let rank = 2; rank <= 14; rank++) {
          cards.push({ suit, rank });
        }
      }

      // 添加大小王
      cards.push({ rank: 15, suit: "joker" }); // 小王
      cards.push({ rank: 16, suit: "joker" }); // 大王

      // 洗牌
      return this.shuffleCards(cards);
    },

    shuffleCards(cards) {
      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
      }
      return cards;
    },

    dealCards(cards) {
      // 发牌
      this.playerCards = cards.slice(0, 17);
      this.leftPlayerCards = cards.slice(17, 34);
      this.rightPlayerCards = cards.slice(34);
    },

    handleCardClick(card) {
      const index = this.selectedCards.findIndex(
        (c) => c.suit === card.suit && c.rank === card.rank
      );

      if (index > -1) {
        // 如果已选中，则取消选中
        this.selectedCards.splice(index, 1);
      } else {
        // 如果未选中，则选中
        this.selectedCards.push(card);
      }
    },

    async playCards() {
      if (!this.selectedCardsValid) return;

      // 出牌
      this.lastPlayedCards = [...this.selectedCards];
      this.playerCards = this.playerCards.filter(
        (card) => !this.selectedCards.includes(card)
      );

      this.lastMove = {
        playerName: this.currentPlayer.name,
        type: "play",
      };

      this.lastValidPlay = [...this.lastPlayedCards];
      this.selectedCards = [];
      this.nextTurn();
    },

    pass() {
      // 不出时清空选中的牌
      this.selectedCards = [];
      // 这里添加不出的逻辑
      this.lastMove = {
        playerName: this.currentPlayer.name,
        type: "pass",
      };
      // ... 其他不出逻辑
      this.nextTurn();
    },

    validateCards(cards) {
      return validateCards(cards, this.lastPlayedCards);
    },

    nextTurn() {
      this.currentTurn = (this.currentTurn + 1) % 3;
      this.isCurrentPlayer = this.currentTurn === 0;

      if (!this.isCurrentPlayer) {
        this.simulateOpponentMove();
      }
    },

    async simulateOpponentMove() {
      // 模拟对手出牌
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const currentOpponent =
        this.currentTurn === 1
          ? {
              cards: this.leftPlayerCards,
              player: this.leftPlayer,
            }
          : {
              cards: this.rightPlayerCards,
              player: this.rightPlayer,
            };

      // 随机决定是否出牌
      if (Math.random() > 0.5 && currentOpponent.cards.length > 0) {
        // 随机出一张牌
        const playedCard = currentOpponent.cards.splice(0, 1)[0];
        this.lastPlayedCards = [playedCard];
        this.lastMove = {
          playerName: currentOpponent.player.name,
          type: "play",
        };
      } else {
        this.lastMove = {
          playerName: currentOpponent.player.name,
          type: "pass",
        };
      }

      this.nextTurn();
    },

    startGameLoop() {
      if (!this.isCurrentPlayer) {
        this.simulateOpponentMove();
      }
    },

    getFirstChar(name) {
      return (name || "玩家").charAt(0);
    },

    getAvatarColor(name = "玩家") {
      const colors = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae", "#f56a00"];
      let total = 0;
      for (let i = 0; i < name.length; i++) {
        total += name.charCodeAt(i);
      }
      return colors[total % colors.length];
    },
  },
  mounted() {
    this.initGame();
  },
};
</script>

<style scoped>
.game-container {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 2rem 1fr 2rem; /* 减小左右两侧宽度 */
  grid-template-rows: 1fr auto;
  background-color: #f0f2f5;
  box-sizing: border-box;
  padding: 0.2rem;
}

.opponent {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  position: relative;
}

.opponent .player-info {
  z-index: 1;
  font-size: 0.24rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.opponent .player-info img {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  margin-bottom: 0.1rem;
}

/* 修改垂直卡牌的样式 */
.vertical-cards {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(90deg);
  transform-origin: center;
  width: 40vh; /* 减小宽度 */
  height: 2rem; /* 减小高度 */
}

/* 调整卡牌重叠程度 */
.vertical-cards .card {
  margin-left: -0.5rem; /* 增加重叠 */
}

/* 当前玩家区域 */
.current-player {
  grid-column: 1 / 4;
  grid-row: 2;
  padding: 0.2rem;
  height: 35vh; /* 减小底部高度 */
}

/* 中央区域 */
.center-area {
  grid-column: 2;
  grid-row: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 0.2rem;
  gap: 0.3rem; /* 增加各元素之间的间距 */
}

.played-cards-area {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 2.5rem; /* 确保有足够的空间 */
}

.game-controls {
  display: flex;
  gap: 0.3rem;
  margin-bottom: 0.5rem; /* 增加底部间距 */
}

.btn {
  padding: 0.15rem 0.4rem;
  border: none;
  border-radius: 0.08rem;
  font-size: 0.32rem;
  cursor: pointer;
  min-width: 1.6rem;
  color: white;
  transition: all 0.2s;
}

.play-btn {
  background-color: #42b983;
}

.pass-btn {
  background-color: #f56c6c;
}

.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.btn:active:not(:disabled) {
  transform: scale(0.98);
}

.last-move {
  background: rgba(0, 0, 0, 0.1);
  padding: 0.15rem 0.3rem;
  border-radius: 0.08rem;
  font-size: 0.28rem;
  margin-top: 0.3rem;
}

.player-name {
  font-weight: bold;
  margin-right: 0.1rem;
}

.avatar {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.4rem;
  font-weight: bold;
}

.opponent .avatar {
  width: 0.6rem;
  height: 0.6rem;
  font-size: 0.3rem;
}

.current-player .avatar {
  width: 0.8rem;
  height: 0.8rem;
  font-size: 0.4rem;
}
</style>
