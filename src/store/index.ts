import { createStore } from 'vuex';
import { config } from 'vuex-module-decorators';
import type { App } from 'vue';

config.rawError = true;

const store = createStore({
    strict: true
});

export function setupStore(app: App<Element>) {
    app.use(store);
}

export default store;