import { useTimeoutRef } from "./useTimeoutRef";
import { watch } from 'vue';

export function useTimeoutFn(handle: Fn<any>, wait: number, native = false) {
    if (!(handle instanceof Function)) {
        throw new TypeError('handle is not function');
    };

    const { readyRef, start, stop } = useTimeoutRef(wait);

    if (native) {
        handle();
    } else {
        watch(readyRef, (maturity) => {
            maturity && handle();
        }, { immediate: false });
    }

    return { readyRef, stop, start };
}