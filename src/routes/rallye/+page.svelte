<script lang="ts">
	import { challenges } from '$lib/stores/challenges';

	let totalPoints = 0;
	let completed = 0;

	$: $challenges.forEach((c: any) => {
		if (c.completed) {
			totalPoints += c.points;
			completed += 1;
		}
	});

	import { user } from '$lib/stores/auth';
	import { goto } from '$app/navigation';

	function logout() {
		user.set(null);
		document.cookie = 'user=; Max-Age=0; path=/';
		goto('/');
	}
</script>

<section class="p-4 max-w-2xl mx-auto">
	<h1 class="text-3xl font-bold mb-4">📍 Rallye-Aufgaben</h1>
	<div class="mb-6 text-sm text-gray-600">
		Punkte: <strong>{totalPoints}</strong> | Erledigt: <strong>{completed}</strong>
	</div>

	{#each $challenges as challenge}
		<div class="bg-white dark:bg-zinc-900 rounded-xl shadow p-4 mb-4 border border-gray-200 dark:border-zinc-700">
			<div class="flex items-start justify-between">
				<div>
					<h2 class="text-lg font-semibold">{challenge.title}</h2>
					<p class="text-sm text-gray-600 dark:text-gray-400">{challenge.description}</p>
					<p class="text-sm mt-1 text-green-600">{challenge.points} Punkte</p>
				</div>
				<input
					type="checkbox"
					class="form-checkbox w-5 h-5 text-green-500 mt-1"
					checked={challenge.completed}
					on:change={() => challenges.toggle(challenge.id)}
				/>
			</div>

			<div class="mt-3">
				<input
					type="file"
					accept="image/*,video/*"
					on:change={(e) => {
						const file = (e.target as HTMLInputElement)?.files?.[0];
						if (file) {
							const reader = new FileReader();
							reader.onload = () => challenges.setMedia(challenge.id, reader.result as string);
							reader.readAsDataURL(file);
						}
					}}
				/>
			</div>

			{#if challenge.media}
				<div class="mt-2">
					{#if challenge.media.startsWith('data:image')}
						<img src={challenge.media} alt="Beweis" class="w-32 h-32 object-cover rounded border" />
					{:else}
						<video src={challenge.media} controls class="w-32 h-32 rounded border" />
					{/if}
				</div>
			{/if}
		</div>
	{/each}
	<button on:click={logout} class="text-red-600 text-sm underline">Logout</button>
</section>
