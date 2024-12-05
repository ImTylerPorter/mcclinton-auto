<script lang="ts">
	import { onMount } from 'svelte';
	import Hero from './Hero.svelte';
	import About from './About.svelte';
	import Contact from './Contact.svelte';
	import Footer from './Footer.svelte';
	import Gallery from './Gallery.svelte';
	import Outro from './Outro.svelte';
	import Reviews from './Reviews.svelte';
	import Services from './Services.svelte';
	import AdminBar from './AdminBar.svelte';
	import type { PageData } from './$types';
	import type { Section } from '../types';
	import Flash from '../components/Flash.svelte';

	let { data } = $props<{ data: PageData }>();
	let { reviews, userProfile, allSections, galleryData, servicesData, settings, message } = data;

	// Define props for each component
	type ComponentProps = {
		hero: { data: Section[]; userProfile: any; settings: any };
		services: {
			data: Section[];
			userProfile: any;
			services: { title: string; imageUrl: string | null }[];
		};
		about: { data: Section[]; userProfile: any; settings: any };
		testimonials: { data: Section[]; reviews: any[]; userProfile?: any };
		gallery: { data: Section[]; userProfile: any; images: { imageUrl: string }[] };
		outro: { data: Section[]; userProfile: any };
		contact: { data: Section[]; userProfile: any };
	};

	// Map section names to their components
	const componentMap: Record<
		keyof ComponentProps,
		| typeof Hero
		| typeof Services
		| typeof About
		| typeof Reviews
		| typeof Gallery
		| typeof Outro
		| typeof Contact
	> = {
		hero: Hero,
		services: Services,
		about: About,
		testimonials: Reviews,
		gallery: Gallery,
		outro: Outro,
		contact: Contact
	};

	// Order sections based on componentMap
	let orderedSections = allSections
		.filter((section: Section) => section.sectionName in componentMap) // Only include valid sections
		.sort(
			(a: Section, b: Section) =>
				Object.keys(componentMap).indexOf(a.sectionName) -
				Object.keys(componentMap).indexOf(b.sectionName)
		);

	let currentSection = $state<string | null>('hero');
	let sections: HTMLElement[] = [];

	onMount(() => {
		sections = Array.from(document.querySelectorAll('[data-id]'));
		const params = new URLSearchParams(window.location.search);

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						currentSection = entry.target.getAttribute('data-id');
					}
				});
			},
			{ threshold: 0.4 }
		);

		sections.forEach((section) => observer.observe(section));
		return () => observer.disconnect();
	});

	// Get props for specific components
	function getComponentProps(
		section: Section,
		reviews: any[],
		galleryData: Record<string, { imageUrl: string }[]>,
		servicesData: Record<string, { title: string; imageUrl: string | null }[]>,
		settings: any // Include settings
	): ComponentProps[keyof ComponentProps] {
		switch (section.sectionName) {
			case 'testimonials':
				return { data: [section], reviews };
			case 'gallery':
				return { data: [section], userProfile, images: galleryData[section.id] || [] };
			case 'services':
				return { data: [section], userProfile, services: servicesData[section.id] || [] };
			case 'hero':
			case 'about':
				return { data: [section], userProfile, settings }; // Pass settings here
			case 'outro':
			case 'contact':
				return { data: [section], userProfile };
			default:
				return { data: [section], userProfile }; // Fallback
		}
	}
</script>

<Flash {message} />

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
		editLink={currentSection ? `/edit/${currentSection.toLowerCase()}` : '#'}
	/>
{/if}

<!-- Render sections dynamically -->
{#each orderedSections as section (section.id)}
	{@const Component = componentMap[section.sectionName as keyof typeof componentMap]}
	<Component {...getComponentProps(section, reviews, galleryData, servicesData, settings) as any} />
{/each}

<Footer {settings} />
