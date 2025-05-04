<script lang="ts">
	import { user } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let username = '';

	// Wenn schon eingeloggt, direkt weiter zur Rallye
	onMount(() => {
		if ($user) {
			goto('/rallye');
		}
	});

	function login() {
		if (username.trim()) {
			user.set(username);
			document.cookie = `user=${username}; path=/`;
			goto('/rallye');
		}
	}
</script>

<section class="p-4 max-w-sm mx-auto mt-20">
	<h1 class="text-3xl font-bold mb-4">🎉 Willkommen zur Rallye</h1>
	<p class="mb-6 text-gray-600">Bitte gib deinen Namen ein, um mitzumachen.</p>

	<input
		bind:value={username}
		type="text"
		placeholder="Dein Name"
		class="w-full p-2 border rounded mb-4"
	/>
	<button on:click={login} class="bg-blue-600 text-white px-4 py-2 rounded w-full">
		Einloggen & Starten
	</button>
</section>
