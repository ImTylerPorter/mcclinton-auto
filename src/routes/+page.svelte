<script>
	// @ts-nocheck

	import About from './About.svelte';
	import Gallery from './Gallery.svelte';
	import Hero from './Hero.svelte';
	import Outro from './Outro.svelte';
	import Reviews from './Reviews.svelte';
	import Services from './Services.svelte';

	export let data;
	let { reviews } = data;
</script>

<Hero />
<Services />
<About />
<Reviews {reviews} />
<Gallery />
<Outro />
