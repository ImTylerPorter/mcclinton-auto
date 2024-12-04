<script lang="ts">
	import { onMount } from 'svelte';

	// State variables
	let inView = $state(false);

	// References to DOM elements
	let imageElement: HTMLElement | null = $state(null);
	let content: HTMLElement | null = $state(null);

	// Props
	let { observer }: { observer?: IntersectionObserver } = $props();

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
				<img src="/images/us.jpg" alt="The McClinton Auto Crew" />
			</div>
			<div class="content" bind:this={content} class:visible={inView}>
				<p class="pre-title">ABOUT</p>
				<h3>MCCLINTON AUTO COLLISION</h3>
				<p>
					McClinton Auto Collision was started by owner Mark McClinton in 1997 when he decided it
					was time to provide Albany with quality repairs and quick turnaround. Mark has been in the
					business for over 40 years. Today Mark's son Aaron is in control of operations and has
					continued to grow the company to be competitive and relevant in todays market. With new
					flare mixed with significant experience McClinton Auto Collision is sure to be your best
					bet for vehicle repair and restoration. Call us today!
				</p>
				<div class="contact">
					<h5>Contact Us</h5>
					<p>3960 E Commercial Way SE Albany, OR 97322</p>
					<a href="tel:5419679528">541•967•9528</a>
					<a href="mailto:info@mcclintonauto.com">info@mcclintonauto.com</a>
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
	.contact p {
		font-size: 1.1rem;
		margin: 0;
		line-height: 1.1;
		text-transform: uppercase;
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
