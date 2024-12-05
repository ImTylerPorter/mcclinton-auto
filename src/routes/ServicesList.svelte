<script lang="ts">
	import { onMount } from 'svelte';

	let inView = $state(false); // Tracks whether services are in view
	let servicesContainer: HTMLElement | null = null; // DOM reference for the services container

	let { services: allServices } = $props<{
		services?: { title: string; imageUrl: string | null }[];
	}>();

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					inView = true; // Trigger animations when in view
				}
			});
		});

		// Observe the container for visibility
		if (servicesContainer) {
			observer.observe(servicesContainer);
		}

		// Cleanup observer on unmount
		return () => {
			if (servicesContainer) observer.unobserve(servicesContainer);
		};
	});
</script>

<div class="servicesList">
	<div class="container">
		<h3>Our <span>Services</span></h3>
		<div class="services" bind:this={servicesContainer} class:visible={inView}>
			{#each allServices || [] as service (service.title)}
				<div class="box">
					<img src={service.imageUrl || 'images/default-service.jpg'} alt={service.title} />
					<div class="content">
						<span>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
								<path
									d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
								/>
							</svg>
						</span>
						<h4>{service.title}</h4>
					</div>
					<div class="dark-bg"></div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.servicesList {
		margin-top: 50px;
	}
	h3 {
		font-size: 2rem;
		text-transform: uppercase;
	}
	h3 span {
		color: var(--green);
	}

	.services {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 50px;
	}

	.box {
		position: relative;
		opacity: 0;
		transition:
			opacity 800ms ease,
			transform 800ms ease;
		transform: translateY(20px);
	}
	.box:nth-child(2) {
		transition-delay: 200ms;
	}
	.box:nth-child(3) {
		transition-delay: 400ms;
	}

	.services.visible .box {
		opacity: 1;
		transform: translateY(0);
	}

	.box img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		aspect-ratio: 1/1;
	}

	.content {
		position: absolute;
		bottom: 0;
		left: 20px;
		z-index: 3;
	}

	.content span {
		background: var(--green);
		border-radius: 50%;
		padding: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 15px;
		height: 15px;
	}

	.content svg {
		width: 10px;
	}

	.content svg path {
		fill: white;
	}

	h4 {
		color: white;
		font-size: 1.5rem;
		font-weight: 400;
		text-transform: uppercase;
		margin-top: 4px;
	}

	div.dark-bg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
	}

	@media (max-width: 869px) {
		.services {
			grid-template-columns: 1fr;
		}
	}
</style>
