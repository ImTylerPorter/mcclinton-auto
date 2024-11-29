<script lang="ts">
	import { register } from 'swiper/element/bundle';
	register();

	// Define the props interface
	interface Props {
		error?: string | null; // Optional error property
		reviews: Array<{ comment: string; customerName: string; carMake: string }> | string; // Array of review objects or a string
	}

	// Props declaration
	export let error: Props['error'] = null; // Default value for error
	export let reviews: Props['reviews'];

	const spaceBetween = 0;

	const onProgress = (e: CustomEvent<[unknown, number]>) => {
		const [swiper, progress] = e.detail;
		console.log(progress);
	};

	const onSlideChange = (e: Event) => {
		console.log('slide changed');
	};
</script>

<section id="testimonials">
	<div class="container">
		<h3>Client Reviews</h3>

		<div class="reviewsWrap">
			<div>
				<div class="stars">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
						><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
							d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
						/></svg
					>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
						><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
							d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
						/></svg
					>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
						><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
							d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
						/></svg
					>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
						><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
							d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
						/></svg
					>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
						><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
							d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
						/></svg
					>
				</div>
				<div class="reviews">
					<swiper-container
						autoplay-delay="3000"
						autoplay-disable-on-interaction="false"
						slides-per-view={1}
						space-between={spaceBetween}
					>
						{#if error}
							<p>Error: {error}</p>
						{:else if reviews && reviews.length > 0}
							{#each reviews as review}
								{#if typeof review !== 'string'}
									<swiper-slide>
										<p>{review.comment}</p>
										<p class="name">{review.customerName}</p>
										<p class="make">{review.carMake}</p>
									</swiper-slide>
								{/if}
							{/each}
						{/if}
					</swiper-container>
				</div>
			</div>
			<div class="image">
				<img src="images/reviews.jpg" alt="Vehicle repaired by McClinton Auto Collision" />
			</div>
			<a
				href="https://www.carwise.com/auto-body-shops/mcclinton-auto-collision-inc-albany-or-97322/555006?w=McClinton+Auto+Collision+Inc."
				target="_BLANK"
				class="button"
			>
				<span>Read More</span>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
					><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
						d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"
					/></svg
				>
			</a>
		</div>
	</div>
</section>

<style>
	section#testimonials {
		background-color: var(--tan);
		padding: 100px 0;
		background-repeat: no-repeat;
		background-image: url('/images/reviews-bg.jpg');
		background-position: center right;
		background-size: auto 100%;
	}

	swiper-container {
		overflow: hidden;
		width: 100%;
	}

	.reviewsWrap > div:first-child {
		overflow: hidden;
		padding: 50px;
	}

	.container {
		width: 1000px;
	}
	h3 {
		margin: 0;
		color: white;
		font-size: 2.5rem;
		letter-spacing: 2px;
		text-transform: uppercase;
	}

	.reviewsWrap {
		position: relative;
		display: grid;
		grid-template-columns: 1fr 300px;
		background: white;
		margin-top: 40px;
		box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.3);
	}
	.reviews p {
		font-size: 1.3rem;
	}
	.stars {
		display: flex;
		gap: 10px;
	}
	.stars svg {
		width: 20px;
	}
	.stars path {
		fill: var(--green);
	}
	p.name {
		font-weight: bold;
		margin: 0;
		line-height: 1;
	}
	p.make {
		margin: 0;
		line-height: 1;
		font-size: 1rem;
	}
	.image img {
		width: 100%;
		height: 100%;
		display: block;
		aspect-ratio: 1/1;
		object-fit: cover;
		object-position: center;
	}

	.button {
		position: absolute;
		bottom: -22px;
		left: 50px;
		display: flex;
		gap: 8px;
	}

	.button:hover {
		background: var(--black);
	}

	.button svg {
		height: 20px;
	}

	.button path {
		fill: white;
	}

	@media (max-width: 869px) {
		.reviewsWrap {
			grid-template-columns: 1fr;
		}
		.image {
			display: none;
		}

		h3 {
			text-shadow: 2px 2px 10px black;
		}
	}
</style>
