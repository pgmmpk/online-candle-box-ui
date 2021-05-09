import { writable } from 'svelte/store';

export const user = writable(JSON.parse(localStorage.getItem('user', 'null')));

const API_BASE = 'https://us-central1-church-1917.cloudfunctions.net/online-candle-box-webhook'

export const login = async (username, password) => {
    const response = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({username, password}),
    });
    if (response.status == 401) {
        user.set(null);  // clear user info to force login
        return null;
    }

    if (response.status !== 200) {
        throw new Error(`Api call failed with ${response.status}`);
    }

    return await response.json()
};

let token;
user.subscribe(val => {
    if (val) {
        localStorage.setItem('user', JSON.stringify(val));
        token = val.token;
    } else {
        localStorage.removeItem('user');
        token = null;
    }
});

export const api = async (path, options) => {
    const response = await fetch(`${API_BASE}/${path}`, {
        headers: {
            'Authorization': 'Basic ' + btoa(token + ':')
        },
        ...options
    });
    if (response.status == 401) {
        user.set(null);  // clear user info to force login
        throw new Error(`Api call failed with ${response.status}`);
    }

    if (response.status === 404) {
        return undefined;
    }

    if (response.status !== 200) {
        throw new Error(`Api call failed with ${response.status}`);
    }

    return await response.json()
};

