export interface DebounceAndThrottleOptions {
    immediate?: boolean;
    debounce?: boolean;
    once?: boolean;
}

export type CancelFn = () => void;

export type DebounceAndThrottleProcedure<T extends unknown[]> = (...arg: T) => unknown;

export type DebounceAndThrottleProcerduceResult<T extends unknown[]> = [
    DebounceAndThrottleProcedure<T>,
    CancelFn
]

export function useThrottle<T extends unknown[]> (
    handle: DebounceAndThrottleProcedure<T>,
    wait: number,
    options: DebounceAndThrottleOptions = {}
) {

    if (!(handle instanceof Function)) {
        throw new TypeError('handle is not function');
    };

    let { immediate = false } = options;
    const { once = false, debounce = false } = options;
    let timeoutId: Nullable<TimeoutHandle>;
    let cancelled: Nullable<boolean> = false;

    const clearTimer = () => {
        if (timeoutId) {
            window.clearTimeout(timeoutId);
            timeoutId = null;
        }
    }

    const cancel = () => {
        clearTimer();
        cancelled = true;
    }

    const cancelExec = () => {
        once && cancel();
    }

    function fn(this: unknown, ...args: T) {
        if (cancelled) {
            return;
        }

        const exec = () => {
            !debounce && clearTimer();
            handle.apply(this, args);
            cancelExec();
        };

        if (immediate) {
            immediate = false;
            const callNow = !timeoutId;

            if (callNow) {
                exec();
                timeoutId = null;
            }
        } else {
            debounce && clearTimer();
            if (!timeoutId || debounce) {
                timeoutId = setTimeout(exec, wait);
            }
        }
    }

    return [fn, cancel];
}