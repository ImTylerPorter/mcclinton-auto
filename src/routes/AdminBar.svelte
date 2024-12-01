<script>
	// @ts-nocheck
	let { userProfile } = $props();
	let { firstName, email } = userProfile;
</script>

<section>
	<nav>
		<div>
			<h4>Welcome, <a href="/account">{firstName ? firstName : email}</a>!</h4>
		</div>
		<div>
			<a
				href="/logout"
				onclick={(e) =>
					!confirm('Are you really sure you want to leave this digital paradise?') &&
					e.preventDefault()}>Logout</a
			>
		</div>
	</nav>
</section>

<style>
	section {
		background: black;
		position: relative;
		z-index: 19;
		padding: 8px 20px;
		align-items: center;
	}
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	nav > div {
		display: flex;
		gap: 10px;
		align-items: center;
	}
	nav > div h4 {
		color: white;
		margin: 0;
		line-height: 1;
		font-size: 1.2rem;
	}
	nav > div a {
		font-family: inherit;
		color: white;
		text-decoration: underline;
	}
	nav > div a:hover {
		color: var(--tan);
	}
</style>
