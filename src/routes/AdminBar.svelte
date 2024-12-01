<script lang="ts">
	let { userProfile, currentSection, editLink } = $props();
	let { firstName, email } = userProfile;
	// console.log(currentSection, 'currentSection');
</script>

<section>
	<nav>
		<div>
			<h4>Welcome, <a href="/account">{firstName ? firstName : email}</a>!</h4>
		</div>
		<div class="white">
			{#if currentSection}
				<span>
					Viewing: <strong>{currentSection}</strong>
				</span>
				<a href={editLink} class="edit-link">Edit</a>
			{:else}
				<span>Scroll to a section to edit</span>
			{/if}
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
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
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
	.white {
		color: white;
	}
</style>
