import { writable } from 'svelte/store';
import { browser } from '$app/environment';

/**
 * Updates the URL with the given key and value
 * If the value is the same as the default value, the key is removed from the URL
 */
function updateUrl(key, value, defaultValue) {
    if (!browser) return;
    const url = browser ? new URL(window.location.toString()) : null;
    if (value === defaultValue) {
        url.searchParams.delete(key);
    } else {
        url.searchParams.set(key, value);
    }
    window.history.replaceState(history.state, '', url);
}

/**
 * Creates a writable boolean that is stored in the URL
 */
export function createWritableBoolFromUrl(key, defaultValue) {
    const urlValue = browser ? new URL(window.location.toString()).searchParams.get(key) : null;

    var value = urlValue !== null
        ? urlValue === 'true'
        : defaultValue;

    let writableBool = writable(value);
    writableBool.subscribe((value) => {
        updateUrl(key, value, defaultValue);
    });

    return writableBool;
}

/**
 * Creates a writable string that is stored in the URL
 */
export function createWritableStringFromUrl(key, defaultValue) {
    const urlValue = browser ? new URL(window.location.toString()).searchParams.get(key) : null;

    var value = urlValue !== null
        ? urlValue
        : defaultValue;

    let writableString = writable(value);
    writableString.subscribe((value) => {
        updateUrl(key, value, defaultValue);
    });

    return writableString;
}