<script lang="ts">
	import Logo from '../components/Logo.svelte';
	let { settings } = $props();
</script>

<footer>
	<div class="bg-left"></div>
	<div class="bg-right"></div>
	<div class="container-green">
		<div class="logo">
			<Logo />
		</div>
		<div class="inner">
			<div class="social">
				<a
					aria-label="Facebook"
					href={settings.facebookLink || 'https://facebook.com/mcclintonautocollision'}
					target="_BLANK"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
						><path
							d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"
						/></svg
					>
				</a>
				<a
					aria-label="Instagram"
					href={settings.instagramLink || 'https://instagram.com/mcclintonauto'}
					target="_BLANK"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
						><path
							d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
						/></svg
					>
				</a>
			</div>
			<div class="phone">
				<p>Phone</p>
				<a href={`tel:${settings.phoneNumber.replace(/\D/g, '')}`}>{settings.phoneNumber}</a>
			</div>
			<div class="email">
				<p>Email</p>
				<a href={`mailto:${settings.email}`}>{settings.email}</a>
			</div>
			<div class="location">
				<p>Location</p>
				<a
					href={`https://www.google.com/maps/search/${encodeURIComponent(settings.address)}`}
					target="_BLANK">{settings.address}</a
				>
			</div>
		</div>
	</div>
</footer>

<style>
	footer {
		min-height: 650px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		position: relative;
	}
	div.bg-left {
		background-image: url('/images/bg-left.jpg');
		background-position: center;
		background-repeat: no-repeat;
	}
	div.bg-right {
		background-image: url('/images/bg-right.jpg');
		background-position: center;
	}
	div.container-green {
		background: var(--green);
		position: absolute;
		top: -20%;
		left: 50%;
		transform: translateX(-50%);
		width: 30%;
		height: 104.5%;
		padding: 100px 10px 0;
	}
	.logo {
		width: 75%;
		margin: 0 auto;
		display: block;
	}
	.inner {
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 40px;
	}
	p {
		font-size: 0.9rem;
		color: white;
		margin: 0;
		line-height: 1;
		text-transform: uppercase;
	}
	a {
		color: white;
		font-weight: bold;
		font-size: 1rem;
	}
	a:hover {
		color: var(--tan);
	}

	.social {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 15px;
		margin-top: 40px;
	}
	.social svg {
		width: 30px;
		display: block;
	}
	.social path {
		fill: white;
	}
	.social a:hover path {
		fill: var(--tan);
	}

	@media (max-width: 869px) {
		.container-green {
			width: 60% !important;
		}
	}

	@media (max-width: 580px) {
		footer {
			min-height: 580px;
		}
		.container-green {
			height: 102.6% !important;
		}
	}
	@media (max-width: 480px) {
		.container-green {
			width: 80% !important;
		}
	}
</style>
