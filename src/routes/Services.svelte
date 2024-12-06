<script lang="ts">
	import { onMount } from 'svelte';
	import ServicesList from './ServicesList.svelte';

	// Destructure props
	let { data, observer, services } = $props<{
		data?: any[];
		observer?: IntersectionObserver;
		services?: { title: string; imageUrl: string | null }[];
	}>();

	const servicesData = data?.[0] || {
		title: '',
		subTitle: '',
		tagline: '',
		content: '',
		buttonText: null,
		buttonLink: '#',
		image: null
	};

	// Intersection observer state
	let inView = $state(false);

	// Element references
	let imageElement: HTMLElement | null = null;
	let greenBox: HTMLElement | null = null;
	let content: HTMLElement | null = null;

	// Intersection observer logic
	onMount(() => {
		const localObserver =
			observer ||
			new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						inView = true;
					}
				});
			});

		// Observe elements
		[imageElement, greenBox, content].forEach((element) => {
			if (element) localObserver.observe(element);
		});

		return () => {
			// Cleanup
			[imageElement, greenBox, content].forEach((element) => {
				if (element) localObserver.unobserve(element);
			});
		};
	});
</script>

<section id="services" data-id="Services">
	<div class="container">
		<div class="introGrid">
			<!-- Content Section -->
			<div class="content" bind:this={content} class:visible={inView}>
				<p class="pre-title">{servicesData.subTitle}</p>
				<h3>{servicesData.title}</h3>
				<h4>{servicesData.tagline}</h4>
				<div class="html-content-dark">
					{@html servicesData.content || ''}
				</div>
				{#if servicesData.buttonText}
					<a href={servicesData.buttonLink} class="button">{servicesData.buttonText}</a>
				{/if}
			</div>

			<div>
				<div bind:this={imageElement} class="image" class:visible={inView}>
					<img src={servicesData.image || 'images/building.jpg'} alt="Service" />
				</div>
			</div>

			<!-- Decorative Green Box -->
			<div bind:this={greenBox} class="greenBox" class:visible={inView}></div>
		</div>

		<ServicesList {services} />
	</div>
</section>

<style>
	/* General Section Styles */
	#services {
		padding: 50px 0;
		overflow: hidden;
	}
	.container {
		width: 1100px;
		margin: 0 auto;
	}
	.introGrid {
		position: relative;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 50px;
		align-items: center;
		padding: 100px 0;
	}

	/* Content Styles */
	.content {
		transform: translateX(-60%);
		opacity: 0;
		transition: all 800ms ease;
	}
	.content.visible {
		transform: translateX(0);
		opacity: 1;
	}
	p.pre-title {
		font-weight: bold;
		font-size: 1.2rem;
		margin: 0;
		line-height: 1;
	}
	h3 {
		font-size: 2rem;
		color: var(--green);
		margin: 0;
		line-height: 1;
	}
	h4 {
		font-size: 1.2rem;
		margin-top: 0;
	}
	:global(.html-content-dark p) {
		font-size: 1.1rem;
	}

	/* Button Styles */
	.button {
		margin-top: 20px;
		display: inline-block;
		padding: 10px 20px;
		background-color: var(--green);
		color: #fff;
		text-decoration: none;
	}

	/* Image Styles */
	.image {
		box-shadow: 2px 3px 20px rgba(0, 0, 0, 0.6);
		opacity: 0;
		transform: translateY(45px);
		transition:
			opacity 0.6s ease-out,
			transform 0.6s ease-out;
	}
	.image.visible {
		opacity: 1;
		transform: translateY(0);
	}
	.image img {
		width: 100%;
		display: block;
	}

	/* Green Box Styles */
	.greenBox {
		position: absolute;
		top: 0;
		right: -75px;
		bottom: 0;
		background: var(--green);
		width: 400px;
		z-index: -1;
		opacity: 0;
		transform: translate(-45px, 100px);
		transition:
			opacity 0.6s ease-out,
			transform 0.8s ease-out;
	}
	.greenBox.visible {
		opacity: 1;
		transform: translate(0);
	}

	/* Responsive Design */
	@media (max-width: 869px) {
		.introGrid {
			grid-template-columns: 1fr;
			gap: 75px;
		}
		.greenBox {
			top: 310px;
		}
	}
	@media (max-width: 580px) {
		.greenBox {
			width: 300px;
			top: 330px;
		}
	}
	@media (max-width: 440px) {
		.greenBox {
			width: 230px;
			top: 360px;
		}
	}
	@media (max-width: 400px) {
		.greenBox {
			top: 430px;
		}
	}
</style>
