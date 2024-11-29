<script lang="ts">
	import { onMount } from 'svelte';
	let inView = $state(false);
	let services: HTMLElement | null = null; // Type-safe DOM element reference

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					inView = true; // Trigger fly animation when in view
				}
			});
		});

		// Observe the image element when it is available
		if (services) {
			observer.observe(services);
		}

		// Clean up the observer when component is destroyed
		return () => {
			if (services) observer.unobserve(services);
		};
	});
</script>

<div class="servicesList">
	<div class="container">
		<h3>Our <span>Services</span></h3>
		<div class="services" bind:this={services} class:visible={inView}>
			<div class="box">
				<img src="images/collision.jpg" alt="Collision Repair" />
				<div class="content">
					<span>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
							><path
								d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
							/></svg
						>
					</span>
					<h4>Collision Repair</h4>
				</div>
				<div class="dark-bg"></div>
			</div>

			<div class="box">
				<img src="images/paint.jpg" alt="Auto Body Paint" />
				<div class="content">
					<span>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
							><path
								d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
							/></svg
						>
					</span>
					<h4>Auto Body Painting</h4>
				</div>
				<div class="dark-bg"></div>
			</div>

			<div class="box">
				<img src="images/dent.jpg" alt="Auto Body Dent Repair" />

				<div class="content">
					<span>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
							><path
								d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
							/></svg
						>
					</span>
					<h4>Dent Repair</h4>
				</div>
				<div class="dark-bg"></div>
			</div>
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
		transition: opacity 800ms ease;
		transition-delay: 200ms;
	}
	.box:nth-child(2) {
		transition-delay: 400ms;
	}
	.box:nth-child(3) {
		transition-delay: 600ms;
	}

	.services.visible .box {
		opacity: 1;
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
