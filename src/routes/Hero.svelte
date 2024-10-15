<script>
	// @ts-nocheck

	import Logo from '../components/Logo.svelte';
</script>

<section id="hero">
	<div class="container">
		<div class="contentContainer">
			<div class="logo">
				<Logo />
			</div>
			<div class="content">
				<h1>AUTO COLLISION SPECIALIST AT COMPETITIVE PRICING!</h1>
				<p>Providing the best possible service for your vehicle.</p>
				<a href="#contact" class="button">Contact Us!</a>
			</div>
		</div>
	</div>
	<div class="dark-bg"></div>
</section>

<style>
	section {
		position: relative;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		background-image: url('images/hero-bg.jpg');
		min-height: 700px;
		padding: 24px 0;
	}
	.contentContainer {
		max-width: 100%;
		width: 340px;
		display: flex;
		flex-direction: column;
		gap: 30px;
	}
	.logo {
		width: 90%;
		margin: 0 auto;
		display: block;
	}
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	h1 {
		color: white;
		font-size: 2rem;
		margin-top: 0;
		margin-bottom: 10px;
	}
	p {
		color: white;
		font-weight: bold;
		font-style: italic;
		margin: 0;
	}
	.button {
		margin: 30px auto 0;
		display: block;
	}
	.container {
		position: relative;
		z-index: 2;
	}
	.dark-bg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0.7);
		z-index: 1;
	}
</style>
