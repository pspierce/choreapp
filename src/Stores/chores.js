import { writable } from 'svelte/store';

const choreList = [
    { id: 1, time: 'dinner', place: 'kitchen', name: "Wipe counter/Vacuum", multiple: 1, workers: [] },
    { id: 2, time: 'dinner', place: 'kitchen', name: "Pots/Pans", multiple: 1, workers: [] },
    { id: 3, time: 'dinner', place: 'kitchen', name: "Clear table", multiple: 1, workers: [] },
    { id: 4, time: 'daily', place: 'bathroom', name: "Wipe counter", multiple: 1, workers: [] },
    { id: 5, time: 'daily', place: 'bathroom', name: "Empty trash", multiple: 1, workers: [] }
];

function getChoreFromId(id) {
    return choreList[choreList.findIndex(c => c.id == id)];
}

function createChores() {
    const { subscribe, set, update } = writable(choreList);

    return {
        subscribe,
        set,
        update,
        choreIds: choreList.map(c => c.id),
        getChoreFromId: getChoreFromId,
    }
};

const chores = createChores();
export { chores };

