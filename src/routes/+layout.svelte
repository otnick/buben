<script lang="ts">
	import '../app.css';
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
	
	let { children } = $props();
</script>

<div class="flex h-screen w-screen flex-col">
	<AppBar headlineClasses="sm:hidden" centerClasses="hidden sm:block">
		{#snippet lead()}
		<ArrowLeft size={24} />
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
		<p class="opacity-20">
			{@render children()}
		</p>
		</div>
		<!-- Component -->
		<Navigation.Bar>
		<Navigation.Tile label="Files" href="#/files"><IconFolder /></Navigation.Tile>
		<Navigation.Tile label="Images" href="#/images"><IconImage /></Navigation.Tile>
		<Navigation.Tile label="Music" href="#/music"><IconMusic /></Navigation.Tile>
		<Navigation.Tile label="Videos" href="#/videos"><IconVideo /></Navigation.Tile>
		</Navigation.Bar>
	</div>
</div>

