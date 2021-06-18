import { RouteRecordRaw } from "vue-router";

export const routers: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Root",
    redirect: "/home",
    meta: {
      title: "Root"
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../../views/home/index.vue'),
    meta: {
      title: 'Home'
    }
  }
];
