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
							terminal.currentPath = '~/';
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

<div class="mx-auto max-w-4/7 flex-col justify-center gap-10 py-30 text-left align-baseline">
	<section id="top" class="scroll-mt-30">
		<h2 class="text-5xl">Rirannda</h2>
	</section>
	<section id="about" class="scroll-mt-30">
		<h2 class="mb-4 text-4xl">Gorirari</h2>
		<p>me</p>
		<p>me</p>
		<p>me</p>
		<p>me</p>
		<p>me</p>
		<p>me</p>
		<p>me</p>
		<p>me</p>
		<p>me</p>
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
</div>
