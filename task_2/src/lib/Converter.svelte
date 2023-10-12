<script lang="ts">
	interface Currencies {
		[key: string]: number;
	}

	const currencies: Currencies = {
		'USD': 0,
		'EUR': 0,
		'RUB': 0,
		'GBP': 0
	};
	
	async function getCurrencies() {
		await fetch('https://open.er-api.com/v6/latest/USD')
			.then(response => response.json())
			.then(({ rates }) => {
				currencies.USD = rates.USD;
				currencies.EUR = rates.EUR;
				currencies.RUB = rates.RUB;
				currencies.GBP = rates.GBP;
			})
			.catch(error => {
				alert(`Please try again. Error: ${error.message}`);
			})
	}
	getCurrencies();

	const keys = Object.keys(currencies);

	let from: string = 'USD';
	let to: string = 'RUB';
	let input: number = 0;
	let output: number = 0;

	function handleInput() {
		output = +(input / (currencies[from] / currencies[to])).toFixed(2);
	}

	function handleOutput() {
		input = +(output / (currencies[to] / currencies[from])).toFixed(2);
	}
</script>

<div class='converter'>
	<div class='block'>
		<label class='label' for='from'>У меня есть</label>
		<select class='select' name='from' bind:value={from} on:change={handleInput}>
			{#each keys as key}
				<option value={key}>
					{key}
				</option>
			{/each}
		</select>
		<input class='input' bind:value={input} type='text' on:input={handleInput}/>
	</div>

	<div class='block'>
		<label class='label' for='to'>Хочу приобрести</label>
		<select class='select' name='to' bind:value={to} on:change={handleInput}>
			{#each keys as key}
				<option value={key}>
					{key}
				</option>
			{/each}
		</select>
		<input class='input' bind:value={output} type='text' on:input={handleOutput}/>
	</div>
</div>

<style>
	.converter {
		display: flex;
	}

	.block {
		display: flex;
		flex-direction: column;
		&:not(:first-child) {
			margin-left: 40px;
		}
	}

	.label {
		font-size: 20px;
		font-weight: 600;
	}

	.select {
		margin-top: 10px;
		border-radius: 20px;
		padding: 5px 10px;
		border: 2px solid grey;
	}

	.input {
		margin-top: 20px;
		padding: 40px 20px;
		font-size: 50px;
		border-radius: 20px;
		border: 2px solid grey;
	}
</style>