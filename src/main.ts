import { createApp } from "vue";
import App from "./App.vue";
import router, { setupRouter } from "./router";
// import './type/global';
import { AppStore } from "./store/modules/app";

const app = createApp(App);

setupRouter(app);

AppStore.commitSysNo('VITE_APP');

router.isReady().then(() => {
  app.mount("#app");
});
