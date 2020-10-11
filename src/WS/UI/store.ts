import { writable } from 'svelte/store';

// use this to keep the pined state for all, it should be an object with keys
const key = 'sv_pinned';

const defaultValues = {
    'logs': false,
    'dirPannel': false
};

const storedItems = typeof localStorage === 'undefined' ? 
    defaultValues : 
    JSON.parse(localStorage.getItem(key)); 

export const pinnedItem = writable(storedItems);

export const pushPinFolder = (value: boolean) => {
    console.log('+++ set push pin for folder', value);
    pinnedItem.update(pinned => {
        return {...pinned, dirPannel: value };
    }); 
}

pinnedItem.subscribe(pinnedItems => {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(pinnedItems));
    }
})