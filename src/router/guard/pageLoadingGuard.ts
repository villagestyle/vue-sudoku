import { Router } from "vue-router";
import { createLoadingPlaceholder, finishLoadingPlaceholder } from "../../utils/loading";

export function createPageLoadingGuard(router: Router) {
    router.beforeEach(async (to, from, next) => {
        createLoadingPlaceholder();
        next();
    });

    router.afterEach((to, from, next) => {
        finishLoadingPlaceholder();
    })
}