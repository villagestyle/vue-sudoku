import { ref } from "vue";
import { tryOnUnmounted } from "../utils/vueHelper";

export function useTimeoutRef(wait: number) {
  const readyRef = ref(false);
  let timer: TimeoutHandle;

  const stop = () => {
    readyRef.value = false;
    timer && window.clearTimeout(timer);
  };

  const start = () => {
    stop();
    timer = setTimeout(() => {
      readyRef.value = true;
    }, wait);
  };

  start();

  tryOnUnmounted(stop);

  return { readyRef, stop, start };
}
