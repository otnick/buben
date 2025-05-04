import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const initialUser = browser ? getUserFromCookie() : null;

function getUserFromCookie(): string | null {
	if (!browser) return null;
	const match = document.cookie.match(/(?:^|;\s*)user=([^;]*)/);
	return match ? decodeURIComponent(match[1]) : null;
}

export const user = writable<string | null>(initialUser);
