import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import type { App } from "vue";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta:{
      name:'全部作品'
    }
  },
  {
    path: "/c1",
    name: "C1",
    component: () => import("@/views/C1.vue"),
    meta:{
      name:'科技組'
    }
  },
  {
    path: "/c2",
    name: "C2",
    component: () => import("@/views/C2.vue"),
    meta:{
      name:'設計組'
    }
  },
  {
    path: "/vote",
    name: "Vote",
    component: () => import("@/views/Vote.vue"),
    meta:{
      name:'作品投票'
    }
  },   
  {
    path: "/favorite",
    name: "Favorite",
    component: () => import("@/views/Favorite.vue"),
    meta:{
      name:'我的收藏'
    }
  },
  {
    path: "/:id",
    name: "Work",
    component: () => import("@/views/Work.vue"),
  },
  {
    path: "/:path(.*)*",
    name: "error-page",
    redirect: "/",
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
});

export const setupRouter = (app: App) => {
  app.use(router);
};
