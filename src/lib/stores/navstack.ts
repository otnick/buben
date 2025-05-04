import { writable } from 'svelte/store';

type NavStack = {
    stack: string[];
    push: (route: string) => void;
    pop: () => string | undefined;
    peek: () => string | undefined;
};

export const navStack = (() => {
    const { subscribe, update } = writable<string[]>([]);

    const push = (route: string) => {
        update(stack => [...stack, route]);
    };

    const pop = (): string | undefined => {
        let poppedRoute: string | undefined;
        update(stack => {
            poppedRoute = stack[stack.length - 1];
            return stack.slice(0, -1);
        });
        return poppedRoute;
    };

    const peek = (): string | undefined => {
        let currentRoute: string | undefined;
        subscribe(stack => {
            currentRoute = stack[stack.length - 1];
        })();
        return currentRoute;
    };

    return {
        subscribe,
        push,
        pop,
        peek,
        get stack() {
            let currentStack: string[] = [];
            subscribe(stack => {
                currentStack = stack;
            })();
            return currentStack;
        },
    } as NavStack;
})();