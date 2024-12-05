<script lang="ts">
	import Logo from '../components/Logo.svelte';
	import Nav from './Nav.svelte';

	let { userProfile, data, settings } = $props();

	const heroData = data?.[0] || {
		title: '',
		content: '',
		buttonText: null,
		buttonLink: '#',
		image: null
	};
</script>

<section
	id="hero"
	data-id="Hero"
	class:signedIn={userProfile}
	style="background-image: url({heroData.image || '/images/default-hero.jpg'})"
>
	<div class="container">
		<div class="contentContainer">
			<div class="logo">
				<Logo />
			</div>
			<div class="content">
				<h1>{heroData.title}</h1>
				<div class="html-content">
					{@html heroData.content || ''}
				</div>
				{#if heroData.buttonText}
					<a href={heroData.buttonLink} class="button">{heroData.buttonText}</a>
				{/if}
			</div>
		</div>
	</div>
	<div class="navContainer">
		<Nav {settings} />
	</div>
	<div class="dark-bg"></div>
</section>

<style>
	section {
		position: relative;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		min-height: 700px;
		padding: 24px 0;
	}
	.container {
		position: relative;
		z-index: 2;
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

	:global(.html-content p) {
		color: white;
		margin: 0;
	}

	.button {
		margin: 30px auto 0;
		display: block;
	}

	.dark-bg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0.55);
		z-index: 1;
	}

	.signedIn {
		margin-top: 39.5px;
	}

	@media (max-width: 600px) {
		.contentContainer {
			margin: 100px auto;
		}
	}
</style>
