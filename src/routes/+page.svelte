<script lang="ts">
	import { onMount } from 'svelte';
	import About from './About.svelte';
	import Contact from './Contact.svelte';
	import Footer from './Footer.svelte';
	import Gallery from './Gallery.svelte';
	import Hero from './Hero.svelte';
	import Outro from './Outro.svelte';
	import Reviews from './Reviews.svelte';
	import Services from './Services.svelte';
	import type { PageData } from './$types';
	import AdminBar from './AdminBar.svelte';

	let { data } = $props<{ data: PageData }>();
	let { reviews, userProfile } = data;

	let currentSection = $state<string | null>('hero');
	let sections: HTMLElement[] = [];

	onMount(() => {
		sections = Array.from(document.querySelectorAll('[data-id]')); // Select all sections with data-id
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						currentSection = entry.target.getAttribute('data-id');
					}
				});
			},
			{ threshold: 0.2 }
		);

		// Observe each section
		sections.forEach((section) => observer.observe(section));
		return () => observer.disconnect(); // Cleanup on destroy
	});
</script>

<svelte:head>
	<title>McClinton Auto Collision - Albany, Oregon</title>
	<meta
		name="description"
		content="McClinton Auto Collision is your late model, collision repair specialist. We repair all makes and models for all insurance companies and those paying out of pocket!"
	/>
	<meta property="og:title" content="McClinton Auto Collision - Albany, Oregon" />
	<meta
		property="og:description"
		content="McClinton Auto Collision is your late model, collision repair specialist. We repair all makes and models for all insurance companies and those paying out of pocket!"
	/>
	<meta property="og:image" content="/images/preview.jpg" />
</svelte:head>

{#if userProfile}
	<AdminBar
		{userProfile}
		{currentSection}
		editLink={currentSection ? `/edit/${currentSection}` : '#'}
	/>{/if}

<Hero />
<Services />
<About />
<Reviews {reviews} />
<Gallery />
<Outro />
<Contact />
<Footer />
