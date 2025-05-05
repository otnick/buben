<script lang="ts">
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import Plus from '@lucide/svelte/icons/plus';
    import X from '@lucide/svelte/icons/x';

	interface Team {
		name: string;
		car: string;
		password?: string;
		captain: string;
		points: number;
		members: { name: string }[];
	}

    let showCreateTeam = false;

	let teams: Team[] = [];
	let myTeam: any = null;
	let teamName = '';
	let teamCar = '';
	let teamPassword = '';
	let error = '';

	$user = ''; // initial fallback
			myTeam = teams.find((t: Team) => t.members.some(m => m.name === $user));

	onMount(async () => {
		const res = await fetch('/api/teams');
		if (res.ok) {
			const allTeams = await res.json();
			teams = allTeams;

			// Finde das Team des aktuellen Users
			myTeam = teams.find(t => t.members.some(m => m.name === $user));
		}
	});

	async function joinTeam(name: string) {
		const res = await fetch('/api/teams/join', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, member: $user })
		});
		if (res.ok) {
			goto('/team'); // Neu laden
		} else {
			const data = await res.json();
			error = data.message || 'Beitreten fehlgeschlagen';
		}
	}

	async function createTeam() {
		const res = await fetch('/api/teams', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: teamName,
				car: teamCar,
				password: teamPassword,
				captain: $user
			})
		});
		if (res.ok) {
			goto('/team');
		} else {
			const data = await res.json();
			error = data.message || 'Erstellen fehlgeschlagen';
		}
	}
</script>

<h1 class="text-3xl font-bold ms-5 mb-5">🚗 Teamübersicht</h1>

{#if myTeam}
	<!-- ✅ Team-Ansicht -->
	<div class="card p-4 m-5 max-w-xl">
		<h2 class="text-2xl font-bold mb-2">{myTeam.name}</h2>
		<p class="mb-2 text-gray-500">Fahrzeug: {myTeam.car}</p>
		<p class="mb-2 text-gray-500">Captain: {myTeam.captain}</p>
		<p class="mb-4 text-gray-500">Punkte: {myTeam.points}</p>
		<ul class="list-disc ml-5">
			{#each myTeam.members as member}
				<li>{member.name}</li>
			{/each}
		</ul>
	</div>
{:else}
	<!-- ❓ Noch kein Team -->
	<section class="p-4">
		<h2 class="text-xl font-semibold mb-2">Vorhandene Teams</h2>
		<ul class="space-y-4">
			{#each teams as team}
				<li class="border p-4 rounded max-w-md">
					<strong>{team.name}</strong> – {team.members.length} Mitglieder
					<button class="ml-4 text-blue-600 underline" on:click={() => joinTeam(team.name)}>
						Beitreten
					</button>
				</li>
			{/each}
		</ul>

		{#if error}
			<p class="text-red-500 mt-2">{error}</p>
		{/if}
	</section>
    {#if !showCreateTeam}
        <button type="button" class="btn-icon preset-filled fixed bottom-24 right-5" aria-label="Neues Team erstellen" title="Neues Team erstellen"
            on:click={() => (showCreateTeam = !showCreateTeam)}>
            <Plus size={24} />
        </button>
    {/if}
{/if}
{#if showCreateTeam}
    <div class="card p-4 m-5 max-w-xl">
        <h2 class="text-2xl font-bold mb-2">Neues Team erstellen</h2>
        <input bind:value={teamName} class="w-full p-2 border rounded" placeholder="Teamname" />
        <input bind:value={teamCar} class="w-full p-2 border rounded" placeholder="Auto" />
        <input bind:value={teamPassword} class="w-full p-2 border rounded" type="password" placeholder="Passwort" />
        <button on:click={createTeam} class="btn btn-primary w-full mt-2">Erstellen</button>
    </div>
    <button type="button" class="btn-icon preset-filled fixed top-32 right-5" aria-label="Neues Team erstellen" title="Neues Team erstellen"
        on:click={() => (showCreateTeam = !showCreateTeam)}>
        <X size={24} />
    </button>
{/if}
