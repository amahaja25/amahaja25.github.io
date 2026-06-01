<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import {
		buckets,
		toggle,
		getActive,
		typingEffect,
		toggleBuckets,
		getShowBuckets,
		getEmailLabel,
		copyEmail
	} from '$lib/home.svelte.js';

	let { data } = $props();

	let name;
	const text = "Hi! I'm Apurva Mahajan.";

	let flyX = $state(40);

	onMount(() => {
		const cursor = document.createElement('span');
		cursor.classList.add('cursor');
		typingEffect(name, text, cursor);

		const mq = window.matchMedia('(max-width: 768px)');
		flyX = mq.matches ? -40 : 40;
		mq.addEventListener('change', (e) => {
			flyX = e.matches ? -40 : 40;
		});
	});
</script>

<h1 class="apurvamahajan" bind:this={name} aria-label={text}></h1>
<p>
	I'm a journalist and developer, and most recently, a data visuals fellow at <a
		href="https://www.texastribune.org/"
		target="_blank">The Texas Tribune</a
	>. I design interactive tools, create graphics and analyze data to help readers make sense of
	elections, campaign finance and politics. I also write (sometimes). I am a summer 2026 data intern at The Washington Post.
</p>
<p>
	Some of my past stops include <a
		href="https://www.detroitnews.com/staff/84154473007/apurva-mahajan/"
		target="_blank">The Detroit News</a
	>
	via the
	<a href="https://www.dowjonesnewsfund.org/djnfinternships/" target="_blank">Dow Jones News Fund</a
	>, the
	<a href="https://cnsmaryland.org/the-howard-center-for-investigative-journalism/" target="_blank"
		>Howard Center for Investigative Journalism</a
	>, the
	<a
		href="https://www.fredericknewspost.com/search/?l=25&s=start_time&sd=desc&f=html&t=article%2Cvideo%2Cyoutube%2Ccollection&app=editorial&nsa=eedition&q=apurva+mahajan"
		target="_blank">Frederick News-Post</a
	>
	and <a href="https://aviationweek.com/">Aviation Week</a>. I received undergraduate degrees in
	journalism and political science from the University of Maryland, College Park, where I was
	editor-in-chief and data editor of
	<a href="https://dbknews.com/" target="_blank">The Diamondback</a>, the independent student
	newspaper. 
</p>

<div class="icons-row">
	<span class="icons">
		<a href="mailto:amahaja@umd.edu" aria-label={getEmailLabel()} onclick={copyEmail}
			><i class="bi bi-envelope-fill"></i></a
		>
		<a href="https://twitter.com/ApurvaMahajan_" target="_blank" aria-label="twitter"
			><i class="bi bi-twitter"></i></a
		>
		<a href="https://www.linkedin.com/in/amahaja/" target="_blank" aria-label="linkedin"
			><i class="bi bi-linkedin"></i></a
		>
		<a href="https://github.com/amahaja25" target="_blank" aria-label="github"
			><i class="bi bi-github"></i></a
		>
	</span>
	<div class="buckets-row">
		{#if getShowBuckets()}
			<div
				transition:fly={{ x: flyX, duration: 350, opacity: 0 }}
				style="display: flex; gap: 1.5em;"
			>
				{#each buckets as bucket}
					<button
						class="bucket-btn"
						class:active={getActive() === bucket.id}
						onclick={() => toggle(bucket.id)}>{bucket.label}</button
					>
				{/each}
			</div>
		{/if}
		<button class="expand-btn" onclick={toggleBuckets} aria-label={getShowBuckets() ? 'hide' : 'show'}>
			{getShowBuckets() ? '−' : '+'}
		</button>
	</div>
</div>

{#key getActive()}
	<div
		class="bucket-content"
		class:viz-content={getActive() === 'viz'}
		class:reporting-content={getActive() === 'reporting'}
	>
		{#if getActive() === 'viz' && data.work['viz']}
			<div class="viz-grid">
				{#each data.work['viz'] as group}
					{#each group.items as item}
						<div class="viz-card">
							{#if item.embed}
								<iframe src={item.embed.trim()} title={item.hed} class="viz-embed" loading="lazy"
								></iframe>
							{:else if item.img}
								<img src={`/assets/${item.img.trim()}`} alt={item.hed} />
							{:else}
								<div class="viz-placeholder"></div>
							{/if}
							{#if item.hed}<div class="viz-title">
									<a href={item.url} target="_blank">{item.hed}</a>
								</div>{/if}
							{#if item.org}<div class="viz-org">{item.org}</div>{/if}
							{#if item.tools}
								<div class="tags">
									{#each item.tools.split(',') as tool}
										<span class="tag">{tool.trim()}</span>
									{/each}
								</div>
							{/if}
						</div>
					{/each}
				{/each}
			</div>
		{:else if getActive() === 'other' && data.work['other']}
			{#each data.work['other'] as group}
				{#each group.items as item}
					<div class="other-item">
						<div class="subhead-clip">
							{#if item.url}
								<a href={item.url} target="_blank">{item.hed}</a>
							{:else}
								<span>{item.hed}</span>
							{/if}
						</div>
						{#if item.bio}
							<div class="other-desc">{item.bio}</div>
						{/if}
					</div>
				{/each}
			{/each}
		{:else if getActive() && data.work[getActive()]}
			{#each data.work[getActive()] as group}
				{#if group.org}
					<div class="subhead-clip">{group.org}</div>
				{/if}
				<ul class="clip-list">
					{#each group.items as item}
						<li>
							<a href={item.url} target="_blank">{item.hed}</a>
							{#if item.tools}
								<span class="tags">
									{#each item.tools.split(',') as tool}
										<span class="tag">{tool.trim()}</span>
									{/each}
								</span>
							{/if}
						</li>
					{/each}
				</ul>
			{/each}
		{/if}
	</div>
{/key}
