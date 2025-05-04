import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { Challenge } from '$lib/types';

const defaultChallenges: Challenge[] = [
	{ id: '1', title: 'Foto vom Team machen', description: 'Selfie mit allen 🧍‍♂️🧍‍♀️', points: 10, completed: false },
	{ id: '2', title: 'Finde einen roten Briefkasten', description: 'Foto als Beweis 📮', points: 15, completed: false }
];

export function createChallengeStore() {
	const initial = browser
        ? JSON.parse(localStorage.getItem('challenges') || JSON.stringify(defaultChallenges))
		: [];

	const { subscribe, set, update } = writable(initial);

	if (browser) {
		subscribe((value) => {
			localStorage.setItem('challenges', JSON.stringify(value));
		});
	}

    interface Challenge {
        id: string;
        completed: boolean;
        media?: string;
    }

    return {
        subscribe,
        set,
        update,
        toggle: (id: string) =>
            update((challenges: Challenge[]) =>
                challenges.map((c: Challenge) =>
                    c.id === id ? { ...c, completed: !c.completed } : c
                )
            ),
        setMedia: (id: string, media: string) =>
            update((challenges: Challenge[]) =>
                challenges.map((c: Challenge) =>
                    c.id === id ? { ...c, media } : c
                )
            ),
    };
}

export const challenges = createChallengeStore();
