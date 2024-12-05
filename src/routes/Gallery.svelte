<script lang="ts">
	import { register } from 'swiper/element/bundle';
	register();
	let { data, images } = $props();

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
		<h3>Our Gallery</h3>
		<div class="gallery">
			<swiper-container {...swiperOptions}>
				<swiper-slide>
					<img src="images/one.jpg" alt="Wrecked Car" />
				</swiper-slide>
				<swiper-slide>
					<img src="images/two.jpg" alt="Wrecked Car" />
				</swiper-slide>
				<swiper-slide>
					<img src="images/three.jpg" alt="Wrecked Car" />
				</swiper-slide>
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
	}
	.container {
		position: relative;
		z-index: 3;
	}
	h3 {
		color: white;
		text-align: center;
		font-size: 2.5rem;
		margin-top: 0;
		text-transform: uppercase;
		letter-spacing: 2px;
	}
	swiper-slide {
		width: 35em !important;
		height: auto;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
	}

	swiper-slide img {
		width: 100%;
		display: block;
	}
	.centered-green-bg {
		background: var(--green);
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 30%;
		height: 100vh;
	}

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
