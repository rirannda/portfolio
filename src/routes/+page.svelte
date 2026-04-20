<script lang="ts">
	import { onMount } from 'svelte';
	import { terminal } from '$lib/state/terminalState.svelte';
	onMount(() => {
		const sections = document.querySelectorAll('section[id]');

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					// セクションが画面の半分以上を占めたらアクティブとみなす
					if (entry.isIntersecting) {
						const id = entry.target.id;
						if (id === 'top') {
							terminal.currentPath = '/';
						} else {
							terminal.currentPath = `/${id}`;
						}
					}
				});
			},
			{
				// 画面の中央付近で検知するように調整
				threshold: 0,

				rootMargin: '-50% 0px -50% 0px'
			}
		);

		sections.forEach((section) => observer.observe(section));

		return () => observer.disconnect(); // コンポーネント破棄時に解除
	});
</script>

<div class="mx-auto max-w-3/5 flex-col justify-center gap-10 px-15 py-30 text-left align-baseline">
	<section id="top" class="mb-70 scroll-mt-30 pt-50">
		<p class="font-mono text-xl text-green-600 dark:text-green-400">Hi, my name is</p>
		<h1 class="my-3 text-9xl font-bold">Rirannda</h1>
		<p class="my-3 text-4xl">O.M.U.C.T. Student.</p>
		<div class="flex pt-2">
			<a
				class="mr-3 rounded-2xl border border-amber-600 bg-amber-600/10 px-5 py-4 font-[NerdFont] text-lg font-bold transition-all duration-150 hover:bg-amber-600/85"
				href="#featured"
			>
				View projects 
			</a>
			<a
				class="rounded-2xl border border-[#08c] bg-[#08c]/10 px-5 py-4 font-[NerdFont] text-lg font-bold transition-all duration-150 hover:bg-[#08c]/95"
				href="#featured"
			>
				Contact me
			</a>
		</div>
	</section>
	<section id="about" class="scroll-mt-30 pb-5">
		<h2 class="mb-4 border-b border-green-500 text-5xl font-bold">About Me</h2>
		<div class="flex px-6">
			<span class="h-auto w-1 rounded-full bg-green-500 text-green-500">|</span>
			<div class="ml-1 flex-col py-1">
				<p class="w-fit px-1 text-xl">大阪公立大学工業高等専門学校 知能情報コース 2年生</p>
				<p class="w-fit px-1 text-xl">学友会執行部 所属</p>
			</div>
		</div>
	</section>
	<section id="featured" class="scroll-mt-20">
		<h2 class="mb-4 border-b border-green-500 text-2xl">Featured-Projects</h2>
		<p>概要を表示し、「詳細は cd projects へ」と誘導します。</p>
		<p>works</p>
		<p>works</p>
		<p>works</p>
		<p>works</p>
		<p>works</p>
		<p>works</p>
		<p>works</p>
		<p>works</p>
		<p>works</p>
		<p>works</p>
		<p>works</p>
		<p>works</p>
		<p>works</p>
	</section>
	<section id="skills" class="scroll-mt-20">
		<h2 class="mb-4 border-b border-green-500 text-2xl">Skills</h2>
		<p>ここにSkillsの内容を移動します。</p>
		<p>skill</p>
		<p>skill</p>
		<p>skill</p>
		<p>skill</p>
		<p>skill</p>
		<p>skill</p>
		<p>skill</p>
		<p>skill</p>
		<p>skill</p>
		<p>skill</p>
	</section>
	<section id="contact" class="scroll-mt-20">
		<h2 class="mb-4 border-b border-green-500 text-2xl">contact</h2>
	</section>
</div>
