<script>
	import { register } from 'swiper/element/bundle';
	register();
	const spaceBetween = 0;
</script>

<section id="gallery">
	<div class="container">
		<h3>Our Gallery</h3>
		<div class="gallery">
			<swiper-container
				effect="coverflow"
				loop={true}
				grab-cursor="true"
				centered-slides="true"
				coverflow-effect-rotate={0}
				coverflow-effect-stretch={0}
				coverflow-effect-depth={200}
				coverflow-effect-modifier={3}
				coverflow-effect-slide-shadows={true}
				space-between={spaceBetween}
				slides-per-view="auto"
				initial-slide={2}
			>
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
		width: 35em;
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
</style>
