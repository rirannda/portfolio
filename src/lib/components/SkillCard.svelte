<script lang="ts">
	import type { Skill } from '$lib/data/skills';
	let { skill }: { skill: Skill } = $props();

	type SkillColorKey =
		| 'html'
		| 'typescript'
		| 'javascript'
		| 'css'
		| 'python'
		| 'rust'
		| 'svelte'
		| 'react'
		| 'git'
		| 'nodejs'
		| 'windows'
		| 'linux'
		| 'archlinux'
		| 'vscode'
		| 'typst'
		| 'github'
		| 'docker'
		| 'tailwind';

	const colorClasses: Record<
		SkillColorKey,
		{ hoverBorder: string; hoverText: string; text: string }
	> = {
		html: {
			hoverBorder: 'hover:border-html',
			hoverText: 'group-hover:text-html',
			text: 'text-html'
		},
		typescript: {
			hoverBorder: 'hover:border-typescript',
			hoverText: 'group-hover:text-typescript',
			text: 'text-typescript'
		},
		javascript: {
			hoverBorder: 'hover:border-javascript',
			hoverText: 'group-hover:text-javascript',
			text: 'text-javascript'
		},
		css: {
			hoverBorder: 'hover:border-css',
			hoverText: 'group-hover:text-css',
			text: 'text-css'
		},
		python: {
			hoverBorder: 'hover:border-python',
			hoverText: 'group-hover:text-python',
			text: 'text-python'
		},
		rust: {
			hoverBorder: 'hover:border-rust',
			hoverText: 'group-hover:text-rust',
			text: 'text-rust'
		},
		svelte: {
			hoverBorder: 'hover:border-svelte',
			hoverText: 'group-hover:text-svelte',
			text: 'text-svelte'
		},
		react: {
			hoverBorder: 'hover:border-react',
			hoverText: 'group-hover:text-react',
			text: 'text-react'
		},
		git: {
			hoverBorder: 'hover:border-git',
			hoverText: 'group-hover:text-git',
			text: 'text-git'
		},
		nodejs: {
			hoverBorder: 'hover:border-nodejs',
			hoverText: 'group-hover:text-nodejs',
			text: 'text-nodejs'
		},
		windows: {
			hoverBorder: 'hover:border-windows',
			hoverText: 'group-hover:text-windows',
			text: 'text-windows'
		},
		linux: {
			hoverBorder: 'hover:border-linux',
			hoverText: 'group-hover:text-linux',
			text: 'text-linux'
		},
		archlinux: {
			hoverBorder: 'hover:border-archlinux',
			hoverText: 'group-hover:text-archlinux',
			text: 'text-archlinux'
		},
		vscode: {
			hoverBorder: 'hover:border-vscode',
			hoverText: 'group-hover:text-vscode',
			text: 'text-vscode'
		},
		typst: {
			hoverBorder: 'hover:border-typst',
			hoverText: 'group-hover:text-typst',
			text: 'text-typst'
		},
		github: {
			hoverBorder: 'hover:border-github',
			hoverText: 'group-hover:text-github',
			text: 'text-github'
		},
		docker: {
			hoverBorder: 'hover:border-docker',
			hoverText: 'group-hover:text-docker',
			text: 'text-docker'
		},
		tailwind: {
			hoverBorder: 'hover:border-tailwind',
			hoverText: 'group-hover:text-tailwind',
			text: 'text-tailwind'
		}
	};

	const skillColors = $derived(colorClasses[skill.color as SkillColorKey] ?? colorClasses.svelte);

	// モーダルの開閉状態
	let isModalOpen = $state(false);

	// 熟練度に応じたプログレスバーの幅
	const progressWidth = $derived(
		skill.level === '上級'
			? '100%'
			: skill.level === '中級'
				? '66%'
				: skill.level === '初級'
					? '33%'
					: '10%'
	);

	// 熟練度に応じた色
	const progressColor = $derived(
		skill.level === '上級' ? 'bg-green-500' : skill.level === '中級' ? 'bg-blue-500' : 'bg-gray-400'
	);

	function openModal() {
		isModalOpen = true;
	}

	function closeModal(e?: Event) {
		if (e) e.stopPropagation();
		isModalOpen = false;
	}

	// ウィンドウ全体のキーボード操作を監視する関数
	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && isModalOpen) {
			closeModal();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<button
	class={`group flex w-full cursor-pointer flex-col rounded-lg border border-gray-300 bg-white/50 p-5 text-left outline-0 backdrop-blur-sm transition-all ${skillColors.hoverBorder} dark:border-gray-700 dark:bg-black/20`}
	onclick={openModal}
>
	<div class="mb-4 flex items-center gap-4">
		<span class={`font-[NerdFont] text-4xl transition-colors ${skillColors.hoverText}`}
			>{skill.logo}</span
		>
		<h3 class={`text-xl font-bold transition-colors ${skillColors.hoverText}`}>
			{skill.name}
		</h3>
	</div>

	<div class="mb-2 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
		<div
			class="h-2 rounded-full {progressColor} transition-all duration-1000 ease-out"
			style="width: {progressWidth};"
		></div>
	</div>
	<div class="text-right font-mono text-xs opacity-70">{skill.level}</div>
</button>

{#if isModalOpen}
	<div class="fixed inset-0 z-100 flex items-center justify-center p-4">
		<button
			type="button"
			class="absolute inset-0 bg-black/60 backdrop-blur-sm"
			onclick={closeModal}
			aria-label="Close modal"
		></button>

		<div
			role="dialog"
			aria-modal="true"
			aria-labelledby="skill-modal-title"
			class="relative z-10 w-full max-w-md transform rounded-xl border border-gray-300 bg-gray-100 p-6 shadow-2xl transition-transform dark:border-gray-700 dark:bg-[#111111]"
		>
			<button
				type="button"
				class="absolute top-4 right-4 cursor-pointer font-[NerdFont] text-2xl text-gray-500 transition-colors hover:text-black dark:hover:text-white"
				onclick={closeModal}
				aria-label="Close modal"
			>
				
			</button>

			<div class="mb-6 flex items-center gap-4">
				<span class={`font-[NerdFont] text-6xl ${skillColors.text}`}>{skill.logo}</span>
				<div>
					<h3 id="skill-modal-title" class="mb-1 text-2xl font-bold">{skill.name}</h3>
					<span
						class="inline-block rounded px-2 py-1 text-xs font-semibold text-white {progressColor}"
					>
						{skill.level}
					</span>
				</div>
			</div>

			<p class="mb-8 leading-relaxed opacity-90 md:text-base">
				{skill.description}
			</p>

			<a
				href={skill.url}
				target="_blank"
				rel="noopener noreferrer external"
				class="block w-full rounded border border-gray-400 px-4 py-2 text-center font-mono text-lg font-bold transition-colors hover:bg-gray-200 dark:hover:bg-gray-800"
			>
				{skill.urltext}
			</a>
		</div>
	</div>
{/if}
