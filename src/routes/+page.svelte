<script lang="ts">
	import { user } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
  	import { onMount } from 'svelte';

	let username = '';
	let password = '';
	let error = '';
	let isLoading = false;

	async function loginOrCreate() {
		error = '';
		isLoading = true;

		// Erst versuchen einzuloggen
		const loginRes = await fetch('/api/member', {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name: username, password })
		});

		if (loginRes.ok) {
			await handleSuccess(username, password);
			return;
		}

		// Wenn Login fehlschlägt, neuen User erstellen
		const createRes = await fetch('/api/member', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name: username, password })
		});

		if (createRes.ok) {
			await handleSuccess(username, password);
		} else {
			const data = await createRes.json();
			error = data.message || 'Fehler beim Registrieren';
		}

		isLoading = false;
	}

	async function handleSuccess(name: string, pw: string) {
		user.set(name);
		document.cookie = `user=${name}; path=/`;
		document.cookie = `password=${pw}; path=/`;
		goto('/rallye');
	}

	onMount(() => {
		const userCookie = document.cookie.split('; ').find(row => row.startsWith('user='));
		if (userCookie) {
			const userName = userCookie.split('=')[1];
			user.set(userName);
			goto('/rallye');
		}
	});
</script>

<section class="p-4 max-w-sm mx-auto mt-20">
	<h1 class="text-3xl font-bold mb-4">🎉 Willkommen zur Tschechien-Rallye 2025</h1>
	<p class="mb-6 text-gray-600">Logge dich ein oder erstelle ein neues Konto.</p>

	<input
		bind:value={username}
		type="text"
		placeholder="Dein Name"
		class="w-full p-2 border rounded mb-4"
	/>
	<input
		bind:value={password}
		type="password"
		placeholder="Passwort"
		class="w-full p-2 border rounded mb-4"
	/>
	<button
		class="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
		on:click={loginOrCreate}
		disabled={isLoading}
	>
		{isLoading ? 'Wird geladen...' : 'Einloggen / Registrieren'}
	</button>

	{#if error}
		<p class="mt-4 text-red-500 text-sm">{error}</p>
	{/if}
</section>
