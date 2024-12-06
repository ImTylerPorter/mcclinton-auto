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

	const outroData = data?.[0] || {
		title: '',
		content: '',
		buttonText: null,
		buttonLink: '#'
	};

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
			<h3>{yearsInBusiness} {outroData.title}</h3>
			<div class="html-content">
				{@html outroData.content}
			</div>
			{#if outroData.buttonText}
				<a href={outroData.buttonLink} class="button">{outroData.buttonText}</a>
			{/if}
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
	h3 {
		color: white;
	}

	h3 {
		color: var(--green);
		font-size: 2rem;
		margin-top: 0;
		text-transform: uppercase;
		letter-spacing: 2px;
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
