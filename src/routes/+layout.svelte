<script lang="ts">
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/x-icon" href="/favicon.ico" />
	<title>Apurva Mahajan</title>
	<meta name="description" content="This is where the description goes for SEO" />
	<meta name="author" content="Apurva Mahajan" />
	<meta name="google-site-verification" content="UNejqFTyS3ARTaeQwIdanmhfEBPh63HP0-IHhJFN2bQ" />
	<meta name="description" content="Apurva Mahajan" />
	<meta
		name="keywords"
		content="Apurva Mahajan, journalist, journalism, data, developer, texas, texas tribune, washington post, projects, portfolio, website, UMD, University of Maryland"
	/>
</svelte:head>

{@render children()}
