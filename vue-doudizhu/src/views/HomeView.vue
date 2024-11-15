<template>
  <div class="home">
    <header class="hero">
      <h1>欢迎来到斗地主</h1>
      <p>经典棋牌游戏，随时开始</p>
    </header>

    <div class="features">
      <div class="feature-card">
        <div class="icon">🎮</div>
        <h3>快速开始</h3>
        <p>随时加入游戏，与其他玩家一起享受斗地主的乐趣</p>
      </div>
      <div class="feature-card">
        <div class="icon">🏆</div>
        <h3>排行榜</h3>
        <p>查看玩家排名，展示你的实力</p>
      </div>
      <div class="feature-card">
        <div class="icon">👥</div>
        <h3>好友对战</h3>
        <p>邀请好友加入，体验专属对战</p>
      </div>
    </div>

    <div class="cta">
      <button
        v-if="!isLoggedIn"
        @click="$router.push('/login')"
        class="primary"
      >
        立即登录
      </button>
      <button v-else @click="$router.push('/room')" class="primary">
        开始游戏
      </button>
    </div>

    <footer class="footer">
      <div class="stats">
        <div class="stat">
          <strong>{{ onlinePlayers }}</strong>
          <span>在线玩家</span>
        </div>
        <div class="stat">
          <strong>{{ totalGames }}</strong>
          <span>总对局数</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      onlinePlayers: 128,
      totalGames: 1560,
      isLoggedIn: false,
    };
  },
  mounted() {
    // 检查登录状态
    this.isLoggedIn = !!localStorage.getItem("user_token");

    // 这里可以添加获取实时数据的逻辑
    this.fetchGameStats();
  },
  methods: {
    async fetchGameStats() {
      try {
        // 获取游戏统计数据的API调用
        // const response = await fetch('/api/stats');
        // const data = await response.json();
        // this.onlinePlayers = data.onlinePlayers;
        // this.totalGames = data.totalGames;
      } catch (error) {
        console.error("获取游戏统计数据失败:", error);
      }
    },
  },
};
</script>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.hero {
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #42b983 0%, #3498db 100%);
  color: white;
}

.hero h1 {
  font-size: 48px;
  margin: 0;
  margin-bottom: 20px;
}

.hero p {
  font-size: 20px;
  margin: 0;
  opacity: 0.9;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  padding: 60px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  text-align: center;
  padding: 30px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.icon {
  font-size: 40px;
  margin-bottom: 20px;
}

.feature-card h3 {
  margin: 0;
  margin-bottom: 15px;
  color: #2c3e50;
}

.feature-card p {
  margin: 0;
  color: #666;
  line-height: 1.6;
}

.cta {
  text-align: center;
  padding: 40px 20px;
}

.primary {
  padding: 12px 36px;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  background-color: #42b983;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.primary:hover {
  background-color: #3aa876;
}

.footer {
  margin-top: auto;
  padding: 40px 20px;
  background-color: #f8f9fa;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 60px;
}

.stat {
  text-align: center;
}

.stat strong {
  display: block;
  font-size: 24px;
  color: #42b983;
}

.stat span {
  color: #666;
  font-size: 14px;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 36px;
  }

  .hero p {
    font-size: 18px;
  }

  .features {
    grid-template-columns: 1fr;
    padding: 40px 20px;
  }

  .stats {
    gap: 30px;
  }
}
</style>
