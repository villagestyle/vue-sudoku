import { createPageLoadingGuard } from "../router/guard/pageLoadingGuard"

export function createLoadingPlaceholder() {
    const loadingWeaper = document.getElementById('loading-weaper');
    loadingWeaper?.classList.remove('hide');
}

export function finishLoadingPlaceholder() {
    const loadingWeaper = document.getElementById('loading-weaper');
    loadingWeaper?.classList.add('hide');
}