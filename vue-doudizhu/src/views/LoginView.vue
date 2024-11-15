<template>
  <div class="login-container">
    <div class="login-box">
      <h2>用户登录</h2>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">用户名：</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
            placeholder="请输入用户名"
          />
        </div>
        <div class="form-group">
          <label for="password">密码：</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="请输入密码"
          />
        </div>
        <div class="form-actions">
          <button type="submit" :disabled="isLoading">
            {{ isLoading ? "登录中..." : "登录" }}
          </button>
          <button type="button" @click="handleRegister">注册</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/store/user";

export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
      isLoading: false,
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      if (!this.username || !this.password) {
        this.errorMessage = "请输入用户名和密码";
        return;
      }

      this.isLoading = true;
      this.errorMessage = "";

      try {
        // 获取 store 实例
        const userStore = useUserStore();

        // 调用登录方法
        await userStore.login(this.username);

        // 登录成功后跳转
        const redirectPath = this.$route.query.redirect || "/room";
        this.$router.push(redirectPath);
      } catch (error) {
        this.errorMessage = "登录失败：" + (error.message || "未知错误");
      } finally {
        this.isLoading = false;
      }
    },
    handleRegister() {
      // 简单的注册处理
      if (!this.username || !this.password) {
        this.errorMessage = "请输入用户名和密码";
        return;
      }

      const userStore = useUserStore();
      userStore.login(this.username);
      this.$router.push("/room");
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-box {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.error-message {
  background-color: #fff3f3;
  color: #ff4d4f;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  border-color: #42b983;
  outline: none;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

button {
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #42b983;
  color: white;
  transition: opacity 0.3s;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

button[type="button"] {
  background-color: #666;
}

button:hover:not(:disabled) {
  opacity: 0.9;
}
</style>
