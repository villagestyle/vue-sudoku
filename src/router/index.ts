import { createWebHistory, createRouter } from "vue-router";
import { routers } from "./routers";
import { scrollBehaviorFn } from "./scrollBehavior";
import type { App } from "vue";
import { createGuard } from "./guard";

const router = createRouter({
  history: createWebHistory(),
  routes: routers,
  strict: true,
  // 管理组件滚动行为
  scrollBehavior: scrollBehaviorFn
});

export function setupRouter(app: App<Element>) {
  app.use(router);
  createGuard(router);
}

export default router;
