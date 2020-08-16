import { writable } from 'svelte/store';

function createState() {
    const { subscribe, update, set } = writable({
        spinActive: false,
        noUsers: true
    });

    return {
        subscribe,
        toggleSpin: () => { spinActive = !spinActive },
    };
}

export const state = createState();