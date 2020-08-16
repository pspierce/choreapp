import { writable } from 'svelte/store';
//This is to just show that we can import something from svelte for a unit test with Jasmine.
export const ExampleStore = writable(0);