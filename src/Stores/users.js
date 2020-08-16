import { writable } from 'svelte/store';
import { chores } from './chores.js';
import { debug } from 'svelte/internal';

const workerList = [
    { id: 1, name: 'Noah', done: false, available: false, chores: [] },
    { id: 2, name: "Ethan", done: false, available: false, chores: [] },
    { id: 3, name: "Molly", done: false, available: false, chores: [] }
];

function takenChores() {
    return [].concat.apply(workerList.map(w => w.chores));
};

function getAvailableWorkers() {
    return workerList.filter(w => w.available == true);
};

function userStore() {
    const store = writable(
        workerList
    );

    return {
        subscribe: store.subscribe,
        update: store.update,
        set: store.set,
        getAvailableWorkers,
        takenChores: () => [].concat.apply(workerList.map(w => w.chores)),
        setWorker: (id) => {
            store.update((items) => {
                const updatedWorker = { ...items.find((m) => m.id === id) };
                updatedWorker.available = !updatedWorker.available;
                const workerIndex = items.findIndex((m) => m.id === id);
                const updatedWorkers = [...items];
                updatedWorkers[workerIndex] = updatedWorker;
                return updatedWorkers;
            });
            /* See if we can set some state values here. */
        }
    }
}

const workers = userStore();

function createState() {
    const { subscribe, set, update } = writable(
        {
            spinning: false,
            takenChores: takenChores,
            toggleSpin: () => {
                return
            }
        }
    )
    return {
        subscribe,
        set,
        update,
        takenChores,
    }
}
const state = createState();

export { workers, getAvailableWorkers, state }