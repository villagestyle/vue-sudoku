export function useKeydown(
  keyList: string[],
  callback: Fn<KeyboardEvent, void>
) {
  window.addEventListener("keydown", e => {
    if (keyList.includes(e.key)) {
      callback(e);
    }
  });
}
