<script lang="ts">
	import { onMount } from 'svelte';

	// State variables
	let inView = $state(false);

	// References to DOM elements
	let imageElement: HTMLElement | null = $state(null);
	let content: HTMLElement | null = $state(null);

	// Props
	let {
		data,
		settings,
		observer
	}: { data?: any; settings?: any; observer?: IntersectionObserver } = $props();

	const aboutData = data?.[0] || {
		title: '',
		subTitle: '',
		content: '',
		buttonText: null,
		buttonLink: '#',
		image: null
	};
	// Lifecycle hook to set up the observer
	onMount(() => {
		// Use the provided observer or create a new one
		const localObserver =
			observer ||
			new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						inView = true; // Trigger fly animation when in view
					}
				});
			});

		// Observe the elements
		if (imageElement) {
			localObserver.observe(imageElement);
		}
		if (content) {
			localObserver.observe(content);
		}

		// Cleanup on component destroy
		return () => {
			if (imageElement) localObserver.unobserve(imageElement);
			if (content) localObserver.unobserve(content);
		};
	});
</script>

<section id="about" data-id="About">
	<div class="container">
		<div class="grid">
			<div class="image" bind:this={imageElement} class:visible={inView}>
				<img src={aboutData.image || '/images/us.jpg'} alt="The McClinton Auto Crew" />
			</div>
			<div class="content" bind:this={content} class:visible={inView}>
				<p class="pre-title">{aboutData.subTitle}</p>
				<h3>{aboutData.title}</h3>
				<div class="html-content">
					{@html aboutData.content || ''}
				</div>
				<div class="contact">
					<h5>Contact Us</h5>
					<a
						href={`https://www.google.com/maps/search/${encodeURIComponent(settings.address)}`}
						target="_BLANK">{settings.address}</a
					>
					<a href={`tel:${settings.phoneNumber.replace(/\D/g, '')}`}>{settings.phoneNumber}</a>
					<a href={`mailto:${settings.email}`}>{settings.email}</a>
				</div>
			</div>
		</div>
	</div>
	<div class="green-bg"></div>
</section>

<style>
	#about {
		background: var(--black);
		padding: 100px 0;
		position: relative;
		overflow-x: hidden;
	}

	.container {
		width: 1000px;
		position: relative;
		z-index: 3;
	}

	.green-bg {
		position: absolute;
		width: 30%;
		top: 0;
		left: 0;
		bottom: 0;
		background: var(--green);
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 100px;
	}

	@media (max-width: 869px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}

	.image {
		opacity: 0;
		transform: translateX(-50%);
		transition: all 800ms ease;
	}
	.image.visible {
		opacity: 1;
		transform: translateX(0);
	}
	.image img {
		width: 100%;
		display: block;
	}

	.content {
		opacity: 0;
		transform: translateX(50%);
		transition: all 800ms ease;
	}

	.content.visible {
		opacity: 1;
		transform: translateX(0);
	}

	p {
		color: white;
	}
	h3 {
		color: var(--green);
		font-size: 2rem;
		margin: 0 0 8px;
	}
	p.pre-title {
		text-transform: uppercase;
		font-size: 1.2rem;
		margin: 0;
		line-height: 1;
		letter-spacing: 5px;
	}
	h5 {
		color: green;
		font-weight: normal;
		text-transform: uppercase;
		letter-spacing: 2px;
		margin-bottom: 10px;
	}

	.contact a {
		font-size: 1.1rem;
		text-transform: uppercase;
		color: white;
		display: block;
	}

	@media (max-width: 869px) {
		.grid {
			grid-template-columns: 1fr;
		}

		.image {
			order: 2;
		}

		.green-bg {
			width: 100%;
			top: 66%;
		}
	}

	@media (max-width: 500px) {
		.green-bg {
			top: 75%;
		}
	}
</style>
