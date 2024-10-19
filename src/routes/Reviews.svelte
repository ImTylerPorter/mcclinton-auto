<script>
	import { register } from 'swiper/element/bundle';
	register();

	export let error;
	/**
	 * @type {string | any[]}
	 */
	export let reviews;

	const spaceBetween = 0;
	const onProgress = (e) => {
		const [swiper, progress] = e.detail;
		console.log(progress);
	};
	const onSlideChange = (e) => {
		console.log('slide changed');
	};
</script>

<section id="testimonials">
	<div class="container">
		<h3>Client Reviews</h3>

		<div class="reviewsWrap">
			<div>
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
								<swiper-slide>
									<p>{review.comment}</p>
									<p class="name">{review.customerName}</p>
									<p class="make">{review.carMake}</p>
								</swiper-slide>
							{/each}
						{/if}
					</swiper-container>
				</div>
			</div>
			<div class="image">
				<img src="images/reviews.jpg" alt="Vehicle repaired by McClinton Auto Collision" />
			</div>
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

	.swiper-container {
		overflow: hidden;
		width: 100%;
	}
	.swiper-slide {
		/* display: block; */
	}

	.reviewsWrap > div:first-child {
		overflow: hidden;
		padding: 50px 50px 0;
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
		display: grid;
		grid-template-columns: 1fr 300px;
		background: white;
		margin-top: 40px;
		box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.3);
	}
	.reviews p {
		font-size: 1.3rem;
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
		display: block;
		aspect-ratio: 1/1;
		object-fit: cover;
		object-fit: center;
	}
	.swiper-initialized {
		display: none;
	}
</style>
