import { defineStore } from "pinia";

export const useGameStore = defineStore("game", {
  state: () => ({
    deck: [], // 完整牌堆
    players: [
      { id: 1, cards: [], isLandlord: false },
      { id: 2, cards: [], isLandlord: false },
      { id: 3, cards: [], isLandlord: false },
    ],
    currentPlayer: 0,
    landlordCards: [], // 地主牌
    gameStatus: "waiting", // waiting, playing, ended
    lastPlay: null, // 上一次出的牌
  }),

  getters: {
    getCurrentPlayer: (state) => state.players[state.currentPlayer],
    getGameStatus: (state) => state.gameStatus,
  },

  actions: {
    initializeDeck() {
      const suits = ["♠", "♥", "♣", "♦"];
      const values = Array.from({ length: 13 }, (_, i) => i + 1);

      this.deck = [];
      suits.forEach((suit) => {
        values.forEach((value) => {
          this.deck.push({ value, suit });
        });
      });
      // 添加大小王
      this.deck.push({ value: 16, suit: "Joker", name: "小王" });
      this.deck.push({ value: 17, suit: "Joker", name: "大王" });
    },

    shuffleDeck() {
      for (let i = this.deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
      }
    },

    dealCards() {
      this.players.forEach((player, index) => {
        player.cards = this.deck.slice(index * 17, (index + 1) * 17);
      });
      this.landlordCards = this.deck.slice(51);
    },

    startGame() {
      this.gameStatus = "playing";
      this.initializeDeck();
      this.shuffleDeck();
      this.dealCards();
    },

    resetGame() {
      this.deck = [];
      this.players.forEach((player) => {
        player.cards = [];
        player.isLandlord = false;
      });
      this.currentPlayer = 0;
      this.landlordCards = [];
      this.gameStatus = "waiting";
      this.lastPlay = null;
    },
  },
});
