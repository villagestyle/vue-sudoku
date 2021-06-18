import { Router } from "vue-router";
import { createPageLoadingGuard } from "./pageLoadingGuard";

export function createGuard(router: Router) {
  createPageLoadingGuard(router);
}
