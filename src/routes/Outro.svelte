<script>
	const currentYear = new Date().getFullYear();
	const yearStarted = 1997;
	const yearsInBusiness = currentYear - yearStarted;
	const earliestWorkedOn = currentYear - 15;
</script>

<section id="outro">
	<div class="container">
		<div class="content">
			<h3>{yearsInBusiness} Years in Business</h3>
			<p>
				We are your local, family owned collsion repair facility. We offer complete, high-quality
				repairs on all {earliestWorkedOn} and newer vehicles, for all insurance companies and those paying
				out of pocket! We offer the latest auto body technology. You always have a choice when choosing
				your repair shop! Call us today for more information about having your damanged vehicle repaired.
			</p>
			<a href="tel:5419679528" class="button">Contact Us: <span>541•967•9528</span></a>
		</div>
	</div>
</section>

<style>
	section#outro {
		background: var(--black);
		padding: 100px 0;
		background-repeat: no-repeat;
		background-image: url('./images/outro.jpg');
		background-position: center right;
		background-size: 61% auto;
	}
	.container {
		width: 1000px;
	}
	h3,
	p {
		color: white;
	}

	h3 {
		color: var(--green);
		font-size: 2rem;
		margin-top: 0;
		text-transform: uppercase;
		letter-spacing: 2px;
	}
	p {
		font-size: 1.2rem;
	}
	.content {
		width: 35em;
	}
	.button {
		margin-top: 25px;
		display: inline-block;
	}
</style>
