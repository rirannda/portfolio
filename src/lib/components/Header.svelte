<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { terminal } from '$lib/state/terminalState.svelte';

	const currentPrompt = $derived(
		'visitor@PortfoliOS:~/portfolio' +
			(terminal.currentPath == '/' ? '' : terminal.currentPath) +
			'$ '
	);

	let menuOpen = $state(false);

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}

	const links = [
		{ id: 'top', label: 'Home' },
		{ id: 'about', label: 'About' },
		{ id: 'featured', label: 'Featured' },
		{ id: 'skills', label: 'Skills' }
	] as const;

	function isActiveLink(id: (typeof links)[number]['id']) {
		if (id === 'top') {
			return page.url.hash === '' || page.url.hash === '#top';
		}

		return page.url.hash === `#${id}`;
	}
</script>

<header
	class="fixed flex w-full items-center justify-center border-b-3 border-b-[#08c] bg-[#333333] p-5 py-5 text-white transition-colors duration-300"
>
	<a href={resolve('/')} aria-label="GotoTop" class="ml-22 truncate pr-4 font-mono"
		>{currentPrompt}</a
	>

	<nav class="mr-20 ml-auto hidden items-center gap-6 md:flex" aria-label="Global navigation">
		{#each links as link (link.id)}
			<a
				href={resolve(`/#${link.id}`)}
				class="transition-opacity hover:opacity-80"
				class:font-bold={isActiveLink(link.id)}>{link.label}</a
			>
		{/each}
	</nav>

	<button
		class="relative ml-auto h-9 w-11 shrink-0 md:ml-10"
		aria-label="Toggle menu"
		aria-expanded={menuOpen}
		aria-controls="mobile-menu"
		onclick={toggleMenu}
	>
		<span
			class="absolute top-0 left-0 h-1.5 w-11 rounded-4xl bg-gray-300 transition-transform duration-200"
			class:translate-y-3.5={menuOpen}
			class:rotate-45={menuOpen}
		></span>
		<span
			class="absolute top-3.5 left-0 h-1.5 w-11 rounded-4xl bg-gray-300 transition-opacity duration-200"
			class:opacity-0={menuOpen}
		></span>
		<span
			class="absolute top-7 left-0 h-1.5 w-11 rounded-4xl bg-gray-300 transition-transform duration-200"
			class:-translate-y-3.5={menuOpen}
			class:-rotate-45={menuOpen}
		></span>
	</button>

	{#if menuOpen}
		<nav
			id="mobile-menu"
			class="absolute top-full left-0 z-10 mt-0.75 flex w-full flex-col items-center border-b-2 border-b-[#08c] bg-[#333333]/95 p-4 transition-all"
			aria-label="Mobile navigation"
		>
			{#each links as link (link.id)}
				<a
					href={resolve(`/#${link.id}`)}
					onclick={closeMenu}
					class="rounded px-2 py-3 transition-colors hover:bg-[#020617]"
					class:font-bold={isActiveLink(link.id)}>{link.label}</a
				>
			{/each}
		</nav>
	{/if}
</header>
