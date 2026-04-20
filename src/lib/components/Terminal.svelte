<script lang="ts">
	import { fly } from 'svelte/transition';
	import { terminal } from '$lib/state/terminalState.svelte';
	import { availableDirs, parseCommand } from '$lib/terminal/parser';
	import { availableCommands as commands } from '$lib/terminal/parser';

	let inputValue = $state('');
	let historyIndex = $state(-1);
	let isExpanded = $state(false);
	const maxIndex = $derived(terminal.history.length - 1);
	const currentPrompt = $derived('visitor@PortfoliOS:' + terminal.currentPath + '$ ');
	const currentPath = $derived(terminal.currentPath);
	const latest = $derived(terminal.output[terminal.output.length - 1]);

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Tab') {
			event.preventDefault();
			if (!inputValue) return;

			let tokens = inputValue.split(/\s+/);

			if (
				tokens.length === 1 &&
				(tokens[0] === 'cd' || tokens[0] === 'ls' || tokens[0] === 'theme')
			) {
				tokens.push(' ');
			}

			if (tokens.length === 1) {
				const prefix = tokens[0];
				const matches = commands.filter((cmd: string) => cmd.startsWith(prefix));
				if (matches.length === 1) {
					inputValue = matches[0] + ' ';
				}
			}
			if (tokens.length === 2) {
				const command = tokens[0];
				const prefix = tokens[1];

				let targets: string[] = [];

				if (command === 'cd' || command === 'ls') {
					targets = availableDirs;
				} else if (command === 'theme') {
					targets = ['light', 'dark'];
				}

				const matches = targets.filter((t) => t.startsWith(prefix));
				if (matches.length === 1) {
					// 候補が1つなら元のコマンドとくっつけて補完
					inputValue = `${command} ${matches[0]}`;
				}
			}
			return;
		}
		if (terminal.history.length === 0) {
			return;
		}
		if (event.key === 'ArrowUp') {
			event.preventDefault();
			historyIndex += 1;
			if (historyIndex > maxIndex) {
				historyIndex = maxIndex;
			}
			inputValue = terminal.history[maxIndex - historyIndex];
		}
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			historyIndex -= 1;
			if (historyIndex <= -1) {
				historyIndex = -1;
				inputValue = '';
			} else {
				inputValue = terminal.history[maxIndex - historyIndex];
			}
		}
	}
	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const input = inputValue.trim();
		if (input) {
			terminal.pushHistory(input); // Historyに保存
			const result = await parseCommand(input, currentPath);
			terminal.pushOutput(
				currentPrompt,
				input,
				result.response,
				'isError' in result ? result.isError : false
			);
		}
		inputValue = '';
		historyIndex = -1;
	}
	function toggleTerminal() {
		terminal.isLineExpanded = !terminal.isLineExpanded;
	}
	function toggleExpand() {
		isExpanded = !isExpanded;
	}
</script>

<div id="terminalWrapper" class="fixed right-0 bottom-0 left-0">
	{#if isExpanded}
		<div
			class={`${!terminal.isLineExpanded ? 'hidden' : ''} fixed top-18 right-0 bottom-10 left-0 z-50 mt-1 overflow-y-auto bg-gray-200/90 p-5 font-mono text-black transition-colors duration-300 dark:bg-[#0c0c0c]/90 dark:text-[#e4e4e4]`}
		>
			{#each terminal.output as line, i (i)}
				<div class="mb-2">
					<div>{line.path} {line.command}</div>
					{#if typeof line.response === 'string'}
						<div class="ml-4">{line.response}</div>
					{:else}
						{#each line.response as resLine, j (j)}
							<div class="ml-4 whitespace-pre">{resLine}</div>
						{/each}
					{/if}
				</div>
			{/each}
		</div>
	{:else}
		<div
			class={`fixed ${!terminal.isLineExpanded ? 'pointer-events-none translate-y-4 opacity-0' : 'pointer-events-auto translate-y-0 opacity-100'} bottom-10 z-50 flex w-full border-t border-t-gray-700 bg-gray-200 px-5 pt-2 font-mono transition-all duration-300 dark:bg-[#0c0c0c] dark:text-[#e4e4e4]`}
			transition:fly={{ y: 16, duration: 220 }}
		>
			{#if latest == undefined}
				Welcome to PortfoliOS! Type 'help' to start.
			{:else}
				{latest.path}
				{latest.command} <br />
				{#if typeof latest.response === 'string'}
					<div class="ml-4">{latest.response}</div>
				{:else}
					{#each latest.response as resLine, i (i)}
						<div class="ml-4 whitespace-pre">{resLine}</div>
					{/each}
				{/if}
			{/if}
		</div>
	{/if}
	<form
		onsubmit={handleSubmit}
		class={`${!terminal.isLineExpanded ? 'pointer-events-none translate-y-4 opacity-0' : 'pointer-events-auto translate-y-0 opacity-100'} fixed bottom-0 flex w-full bg-gray-200 p-2 px-5 font-mono transition-all duration-300 dark:bg-[#0c0c0c] dark:text-[#e4e4e4]`}
		transition:fly={{ y: 16, duration: 220 }}
	>
		<span class="">{currentPrompt}</span>
		<input
			type="text"
			bind:value={inputValue}
			onkeydown={handleKeydown}
			class="w-auto flex-1 pl-3 outline-0"
		/>
		<input type="submit" class="ml-2 font-bold outline-0" value="Run" />
		<button
			onclick={toggleExpand}
			class="justify-center py-0 pl-3 font-[NerdFont] text-xl font-bold">󰄿</button
		>
		<button onclick={toggleTerminal} class="justify-center py-0 pr-3 pl-5 font-[NerdFont] text-lg"
			></button
		>
	</form>
	<button
		onclick={toggleTerminal}
		class={`${terminal.isLineExpanded ? 'hidden' : ''} absolute right-0 bottom-0 z-100 h-17 w-17 rounded-t-2xl rounded-bl-2xl border-t-2 border-l-2 border-gray-400 bg-black p-3.5 font-[NerdFont] text-3xl shadow-none shadow-gray-700 transition-all hover:shadow-xl dark:shadow-gray-400`}
		></button
	>
</div>
