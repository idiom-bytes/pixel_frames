import { writable } from 'svelte/store';

export const currentColor = writable('black')
export const frames = writable([
    Array.from(Array(900).keys()), 
    Array.from(Array(900).keys()), 
    Array.from(Array(900).keys())])
export const currentFrame = writable(0)