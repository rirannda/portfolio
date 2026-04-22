<script>
	import { terminal } from '$lib/state/terminalState.svelte';
</script>

<footer>
	<p
		class={`${terminal.isLineExpanded ? 'mb-20' : ''}bg-[#333333] px-5 py-5 text-center font-mono text-sm text-gray-400 transition-colors duration-300`}
	>
		© 2026 Rirannda
	</p>
</footer>
