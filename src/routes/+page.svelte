<script>
	// @ts-nocheck

	import About from './About.svelte';
	import Hero from './Hero.svelte';
	import Reviews from './Reviews.svelte';
	import Services from './Services.svelte';

	export let data;
	let { reviews } = data;
</script>

<Hero />
<Services />
<About />
<Reviews {reviews} />
