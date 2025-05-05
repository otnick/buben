<script lang="ts">
	import '../app.css';
	import { navStack } from '$lib/stores/navstack';


	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	import { Navigation } from '@skeletonlabs/skeleton-svelte';
	// Icons
	import IconFolder from '@lucide/svelte/icons/folder';
	import IconImage from '@lucide/svelte/icons/image';
	import IconMusic from '@lucide/svelte/icons/music';
	import IconVideo from '@lucide/svelte/icons/video';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import Paperclip from '@lucide/svelte/icons/paperclip';
	import Calendar from '@lucide/svelte/icons/calendar';
	import CircleUser from '@lucide/svelte/icons/circle-user';
	import Menu from '@lucide/svelte/icons/menu';
	import Car from '@lucide/svelte/icons/car';
	
	let { children } = $props();
</script>

<div class="flex h-screen w-screen flex-col">
	<AppBar headlineClasses="sm:hidden" centerClasses="hidden sm:block">
		{#snippet lead()}
		<ArrowLeft size={24}/>
		{/snippet}
		{#snippet trail()}
		<div class="hidden space-x-4 sm:flex">
			<Paperclip size={20} />
			<Calendar size={20} />
			<CircleUser size={20} />
		</div>
		<div class="block sm:hidden">
			<Menu size={20} />
		</div>
		{/snippet}
		{#snippet headline()}
		<h2 class="h2">Buben-togo</h2>
		{/snippet}
		<span>Buben-togo</span>
  	</AppBar>
	<!-- Main content -->
	<div class="card border-surface-100-900 grid h-full w-full grid-rows-[1fr_auto] border-[1px]">
		<!-- Content -->
		<div class="flex items-center justify-center">
		<div class="">
			{@render children()}
		</div>
		</div>
		<!-- Component -->
		<Navigation.Bar>
		<Navigation.Tile label="Aufgaben" href="/rallye"><IconFolder /></Navigation.Tile>
		<Navigation.Tile label="Karte" href="/karte"><IconImage /></Navigation.Tile>
		<Navigation.Tile label="Team" href="/team"><Car /></Navigation.Tile>
		<Navigation.Tile label="Regeln" href="/regeln"><IconMusic /></Navigation.Tile>
		<Navigation.Tile label="Medien" href="/medien"><IconVideo /></Navigation.Tile>
		</Navigation.Bar>
	</div>
</div>

