import { writable } from 'svelte/store';

// use this to keep the pined state for all, it should be an object with keys
const key = 'sv_pinned';

const defaultValues = {
    'logs': false,
    'dirPannel': false
};

const storedItems = typeof localStorage === 'undefined' ? 
    defaultValues : 
    JSON.parse((localStorage.getItem(key) || JSON.stringify(defaultValues))); 

export const pinnedItem = writable(storedItems);

export const pushPinFolder = (value: boolean) => {
    pinnedItem.update(pinned => ({...pinned, dirPannel: value })); 
}

export const pushPinLogs = (value: boolean): void => {
    pinnedItem.update(pinned => ({...pinned, logs: value })); 
}

pinnedItem.subscribe(pinnedItems => {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(pinnedItems));
    }
})

export const fullView = writable(false);

export const stats = writable({
    images: null,
    folders: null
})