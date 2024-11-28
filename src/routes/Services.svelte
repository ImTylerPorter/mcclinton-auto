<script>
	import { onMount } from 'svelte';
	import ServicesList from './ServicesList.svelte';
	let inView = $state(false);
	/**
	 * @type {Element}
	 */
	let imageElement = $state();
	/**
	 * @type {Element}
	 */
	let greenBox = $state();
	/**
	 * @type {Element}
	 */
	let content = $state();

	let { observer } = $props();

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					inView = true; // Trigger fly animation when in view
				}
			});
		});

		// Observe the image element when it is available
		if (imageElement) {
			observer.observe(imageElement);
		}

		if (greenBox) {
			observer.observe(greenBox);
		}

		if (content) {
			observer.observe(content);
		}

		// Clean up the observer when component is destroyed
		return () => {
			if (imageElement) observer.unobserve(imageElement);
			if (greenBox) observer.unobserve(greenBox);
			if (content) observer.unobserve(content);
		};
	});
</script>

<section id="services">
	<div class="container">
		<div class="introGrid">
			<div class="content" bind:this={content} class:visible={inView}>
				<p class="pre-title">WELCOME TO</p>
				<h3>MCCLINTON AUTO COLLISION</h3>
				<h4>Auto & Body Repair Specialist</h4>
				<p>
					McClinton Auto Collision is your late model, collision repair specialist. We repair all
					makes and models for all insurance companies and those paying out of pocket! If you've
					been in an auto accident, call us today!
				</p>
				<a href="#contact" class="button">Contact Us</a>
			</div>
			<div>
				<!-- Always render the div, fly transition happens when inView becomes true -->
				<div bind:this={imageElement} class="image" class:visible={inView}>
					<img src="images/building.jpg" alt="Photo of McClinton Auto Collision Building" />
				</div>
			</div>

			<div bind:this={greenBox} class="greenBox" class:visible={inView}></div>
		</div>
		<ServicesList />
	</div>
</section>

<style>
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
		position: relative;
		padding: 100px 0;
	}

	.content {
		transform: translateX(-60%);
		opacity: 0;
		transition: all 800ms ease;
	}

	.content.visible {
		transform: translateX(0);
		opacity: 1;
	}
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
	p {
		font-size: 1.1rem;
	}
	.button {
		margin-top: 20px;
		display: inline-block;
		padding: 10px 20px;
		background-color: var(--green);
		color: #fff;
		text-decoration: none;
	}
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
