<script>
	import Phone from '../components/Phone.svelte';
	import { slide } from 'svelte/transition';
	import { Hamburger } from 'svelte-hamburgers';

	let isNavOpen = false;

	function handleNavOpen() {
		isNavOpen = !isNavOpen;
	}
</script>

<nav>
	<!-- Menu Icon for mobile -->
	<div class="menu-icon" on:click={handleNavOpen}><Hamburger --color="white" /></div>

	<!-- Dropdown menu with slide transition for mobile -->
	{#if isNavOpen}
		<div class="dropdown-menu {isNavOpen && 'open'}" transition:slide>
			<a href="">Services</a>
			<a href="">About Us</a>
			<a href="">Testimonials</a>
			<a href="">Gallery</a>
			<a href="">Contact Us</a>
			<a class="phone" href="tel:5419679528"><Phone /><span>541•967•9528</span></a>
		</div>
	{/if}

	<!-- Always show the menu on desktop -->
	<div class="desktop-menu">
		<a href="">Services</a>
		<a href="">About Us</a>
		<a href="">Testimonials</a>
		<a href="">Gallery</a>
		<a href="">Contact Us</a>
		<a class="phone" href="tel:5419679528"><Phone /><span>541•967•9528</span></a>
	</div>
</nav>

<style>
	nav {
		background: var(--green);
		border-radius: 25px;
		position: absolute;
		top: 24px;
		right: 24px;
		z-index: 2;
	}
	a {
		color: white;
		padding: 20px;
	}

	a:hover {
		color: var(--tan);
	}
	.phone {
		display: inline-flex;
		gap: 8px;
	}
	.menu-icon {
		cursor: pointer;
		font-size: 24px;
	}

	/* Dropdown menu for mobile */
	.dropdown-menu {
		flex-direction: column;
		background-color: var(--green);
		padding: 15px;
		position: absolute;
		top: 70px;
		right: 0;
		display: flex;
		width: 300px;
	}

	.dropdown-menu a {
		text-decoration: none;
	}

	/* Always visible desktop menu */
	.desktop-menu {
		display: none; /* Hidden by default */
		position: static; /* Static position on desktop */
		background-color: transparent; /* No background */
		padding: 0; /* No padding on desktop */
	}

	.desktop-menu a {
		padding: 20px; /* Consistent padding */
	}

	.hamburger {
		color: var(--white);
	}

	@media (min-width: 1100px) {
		nav {
			width: auto;
			right: 0;
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}
		.menu-icon {
			display: none; /* Hide the hamburger icon on desktop */
		}
		a:first-of-type {
			padding-left: 40px;
		}
		a:last-of-type {
			padding-right: 100px;
		}

		/* Always show the menu on desktop */
		.desktop-menu {
			display: flex; /* Show menu in a row on desktop */
			flex-direction: row; /* Display items in a row */
		}
	}
</style>
