<script lang="ts">
	import { onMount } from 'svelte';

	// State variable to track visibility
	let inView = $state(false);

	// Reference to the DOM element
	let content: HTMLElement | null = $state(null);

	// Dynamic year calculations
	const currentYear = new Date().getFullYear();
	const yearStarted = 1997;
	const yearsInBusiness = currentYear - yearStarted;
	const earliestWorkedOn = currentYear - 15;

	// Props for optional observer
	let { data, observer }: { data?: any; observer?: IntersectionObserver } = $props();

	// Lifecycle hook
	onMount(() => {
		// Use provided observer or create a new one
		const localObserver =
			observer ||
			new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						inView = true; // Trigger animation when in view
					}
				});
			});

		// Observe the content element
		if (content) {
			localObserver.observe(content);
		}

		// Cleanup on component destroy
		return () => {
			if (content) localObserver.unobserve(content);
		};
	});
</script>

<section id="outro" data-id="Outro">
	<div class="container">
		<div class="content" bind:this={content} class:visible={inView}>
			<h3>{yearsInBusiness} Years in Business</h3>
			<p>
				We are your local, family owned collsion repair facility. We offer complete, high-quality
				repairs on all {earliestWorkedOn} and newer vehicles, for all insurance companies and those paying
				out of pocket! We offer the latest auto body technology. You always have a choice when choosing
				your repair shop! Call us today for more information about having your damanged vehicle repaired.
			</p>
			<a href="tel:5419679528" class="button">Contact Us: <span>541•967•9528</span></a>
		</div>
	</div>
</section>

<style>
	section#outro {
		background: var(--black);
		padding: 100px 0;
		background-repeat: no-repeat;
		background-image: url('/images/outro.jpg');
		background-position: center right;
		background-size: 60% auto;
	}
	.container {
		width: 1000px;
	}
	h3,
	p {
		color: white;
	}

	h3 {
		color: var(--green);
		font-size: 2rem;
		margin-top: 0;
		text-transform: uppercase;
		letter-spacing: 2px;
	}
	p {
		font-size: 1.2rem;
	}
	.content {
		width: 35em;
		max-width: 100%;
		opacity: 0;
		transform: translateX(-100%);
		transition: all 800ms ease;
	}
	.content.visible {
		opacity: 1;
		transform: translateX(0);
	}
	.button {
		margin-top: 25px;
		display: inline-block;
	}
	@media (max-width: 869px) {
		section#outro {
			background-size: cover;
		}
	}
</style>
