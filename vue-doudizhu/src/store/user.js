import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: localStorage.getItem("user_token") || "",
    userInfo: JSON.parse(localStorage.getItem("user_info")) || null,
  }),

  actions: {
    login(username) {
      // 简单模拟登录，实际项目中需要调用后端 API
      const token = "mock_token_" + Date.now();
      const userInfo = {
        username,
        avatar: "https://placekitten.com/40/40",
        score: 1000,
      };

      // 保存到 localStorage
      localStorage.setItem("user_token", token);
      localStorage.setItem("user_info", JSON.stringify(userInfo));

      // 更新 store 状态
      this.token = token;
      this.userInfo = userInfo;
    },

    logout() {
      // 清除用户信息
      localStorage.removeItem("user_token");
      localStorage.removeItem("user_info");

      this.token = "";
      this.userInfo = null;
    },
  },

  getters: {
    isLoggedIn: (state) => !!state.token,
  },
});
