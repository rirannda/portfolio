<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import RebootScreen from '$lib/components/RebootScreen.svelte';
	import { terminal } from '$lib/state/terminalState.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{#if terminal.isRebooting}
	<RebootScreen />
{:else}
	<Header />
	{@render children()}
	<Terminal />
{/if}
