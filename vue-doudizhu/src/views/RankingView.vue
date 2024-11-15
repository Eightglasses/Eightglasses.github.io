<template>
  <div class="ranking-container">
    <header class="ranking-header">
      <h1>排行榜</h1>
      <div class="ranking-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          :class="{ active: currentTab === tab.value }"
          @click="currentTab = tab.value"
        >
          {{ tab.label }}
        </button>
      </div>
    </header>

    <div class="ranking-content">
      <table class="ranking-table">
        <thead>
          <tr>
            <th>排名</th>
            <th>玩家</th>
            <th>{{ currentTab === "score" ? "积分" : "胜率" }}</th>
            <th>总局数</th>
            <th>胜场</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(player, index) in sortedRankingList" :key="player.id">
            <td>
              <span :class="'rank-' + (index + 1)" v-if="index < 3">{{
                index + 1
              }}</span>
              <span v-else>{{ index + 1 }}</span>
            </td>
            <td>
              <div class="player-info">
                <img :src="player.avatar" :alt="player.name" />
                <span>{{ player.name }}</span>
              </div>
            </td>
            <td>
              {{ currentTab === "score" ? player.score : player.winRate + "%" }}
            </td>
            <td>{{ player.totalGames }}</td>
            <td>{{ player.wins }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "RankingView",
  data() {
    return {
      currentTab: "score",
      tabs: [
        { label: "积分榜", value: "score" },
        { label: "胜率榜", value: "winRate" },
      ],
      rankingList: [
        {
          id: 1,
          name: "玩家1",
          avatar: "https://placekitten.com/40/40",
          score: 1500,
          totalGames: 100,
          wins: 60,
        },
        {
          id: 2,
          name: "玩家2",
          avatar: "https://placekitten.com/41/41",
          score: 1800,
          totalGames: 150,
          wins: 90,
        },
        {
          id: 3,
          name: "玩家3",
          avatar: "https://placekitten.com/42/42",
          score: 1200,
          totalGames: 80,
          wins: 40,
        },
        // 添加更多测试数据...
      ],
    };
  },
  computed: {
    sortedRankingList() {
      return [...this.rankingList]
        .map((player) => ({
          ...player,
          winRate: ((player.wins / player.totalGames) * 100).toFixed(1),
        }))
        .sort((a, b) => {
          if (this.currentTab === "score") {
            return b.score - a.score;
          } else {
            return parseFloat(b.winRate) - parseFloat(a.winRate);
          }
        });
    },
  },
  methods: {
    async fetchRankingData() {
      try {
        // 这里添加获取排行榜数据的API调用
        // const response = await fetch('/api/ranking')
        // this.rankingList = await response.json()
      } catch (error) {
        console.error("获取排行榜数据失败:", error);
      }
    },
  },
  mounted() {
    this.fetchRankingData();
  },
};
</script>

<style scoped>
.ranking-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.ranking-header {
  margin-bottom: 30px;
  text-align: center;
}

.ranking-tabs {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.ranking-tabs button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #f0f0f0;
}

.ranking-tabs button.active {
  background-color: #42b983;
  color: white;
}

.ranking-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.ranking-table th,
.ranking-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.ranking-table th {
  background-color: #f8f8f8;
  font-weight: 600;
}

.player-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.player-info img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.rank-1,
.rank-2,
.rank-3 {
  font-weight: bold;
}

.rank-1 {
  color: #ffd700;
}

.rank-2 {
  color: #c0c0c0;
}

.rank-3 {
  color: #cd7f32;
}

tr:hover {
  background-color: #f5f5f5;
}
</style>
