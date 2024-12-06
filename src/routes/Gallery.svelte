<script lang="ts">
	import { register } from 'swiper/element/bundle';
	register();

	let { data, images = [] } = $props();

	const galleryData = data?.[0] || {
		title: 'Our Gallery'
	};

	// Swiper configuration options
	const swiperOptions = {
		effect: 'coverflow',
		loop: true,
		grabCursor: true,
		centeredSlides: true,
		coverflowEffect: {
			rotate: 0,
			stretch: 0,
			depth: 200,
			modifier: 3,
			slideShadows: true
		},
		spaceBetween: 0,
		slidesPerView: 'auto',
		initialSlide: 2
	};
</script>

<section id="gallery" data-id="Gallery">
	<div class="container">
		<h3>{galleryData.title}</h3>

		<div class="gallery">
			<swiper-container {...swiperOptions}>
				<!-- Dynamically render slides from images -->
				{#each images as image (image.imageUrl)}
					<swiper-slide>
						<img src={image.imageUrl} alt="Gallery" />
					</swiper-slide>
				{/each}
			</swiper-container>
		</div>
	</div>
	<div class="centered-green-bg"></div>
</section>

<style>
	#gallery {
		padding: 75px 0;
		position: relative;
		overflow: hidden;
		background-color: var(--dark-gray);
	}

	.container {
		position: relative;
		z-index: 3;
		text-align: center;
	}

	h3 {
		color: white;
		font-size: 2.5rem;
		margin: 0 0 40px;
		text-transform: uppercase;
		letter-spacing: 2px;
	}

	swiper-slide {
		width: 35em !important;
		height: auto;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
		border-radius: 10px;
		overflow: hidden;
	}

	swiper-slide img {
		width: 100%;
		display: block;
		object-fit: cover;
	}

	.centered-green-bg {
		background: var(--green);
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 30%;
		height: 100vh;
		z-index: 1;
	}

	/* Responsive Adjustments */
	@media (max-width: 869px) {
		.centered-green-bg {
			width: 60%;
		}
	}

	@media (max-width: 480px) {
		.centered-green-bg {
			width: 80%;
		}
	}
</style>
