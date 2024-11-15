import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import GameView from "../views/GameView.vue";
import RoomView from "../views/RoomView.vue";
import LoginView from "../views/LoginView.vue";
import RankingView from "../views/RankingView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "斗地主首页",
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      title: "用户登录",
    },
  },
  {
    path: "/room",
    name: "room",
    component: RoomView,
    meta: {
      title: "游戏大厅",
      requiresAuth: true,
    },
  },
  {
    path: "/game",
    name: "game",
    component: GameView,
    meta: {
      title: "游戏房间",
      requiresAuth: true,
    },
  },
  {
    path: "/ranking",
    name: "ranking",
    component: RankingView,
    meta: {
      title: "排行榜",
      requiresAuth: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../views/NotFoundView.vue"),
    meta: {
      title: "页面未找到",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title || "斗地主";

  // 检查是否需要登录权限
  if (to.meta.requiresAuth) {
    // 这里需要根据你的实际登录状态管理来修改
    const isLoggedIn = localStorage.getItem("user_token");

    if (!isLoggedIn) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
