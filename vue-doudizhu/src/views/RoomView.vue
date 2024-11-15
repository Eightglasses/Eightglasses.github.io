<template>
  <div class="room-container">
    <header class="room-header">
      <h1>游戏大厅</h1>
      <div class="user-info">
        <span>{{ username }}</span>
        <button @click="logout">退出登录</button>
      </div>
    </header>

    <div class="room-content">
      <div class="room-list">
        <div v-for="room in rooms" :key="room.id" class="room-card">
          <div class="room-info">
            <h3>房间 #{{ room.id }}</h3>
            <p>玩家数: {{ room.playerCount }}/3</p>
            <p>状态: {{ room.status === "waiting" ? "等待中" : "游戏中" }}</p>
          </div>
          <button
            @click="joinRoom(room.id)"
            :disabled="room.status !== 'waiting' || room.playerCount >= 3"
          >
            加入房间
          </button>
        </div>
      </div>

      <div class="room-actions">
        <button class="create-room-btn" @click="createRoom">创建房间</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoomView",
  data() {
    return {
      username: "玩家1", // 这里应该从用户状态获取
      rooms: [
        { id: 1, playerCount: 2, status: "waiting" },
        { id: 2, playerCount: 3, status: "playing" },
        { id: 3, playerCount: 1, status: "waiting" },
      ],
    };
  },
  methods: {
    joinRoom(roomId) {
      // 加入房间逻辑
      console.log("加入房间:", roomId);
      this.$router.push(`/game?roomId=${roomId}`);
    },
    createRoom() {
      // 创建房间逻辑
      console.log("创建新房间");
      // 创建成功后跳转到新房间
      this.$router.push("/game?roomId=new");
    },
    logout() {
      // 退出登录逻辑
      localStorage.removeItem("user_token");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.room-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.room-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.room-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.room-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.room-card {
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.room-info {
  flex: 1;
}

.room-info h3 {
  margin: 0 0 10px 0;
}

.room-info p {
  margin: 5px 0;
  color: #666;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #42b983;
  color: white;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.create-room-btn {
  padding: 12px 24px;
  font-size: 16px;
  background-color: #3498db;
}

.room-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

button:hover:not(:disabled) {
  opacity: 0.9;
}
</style>
