<script>
	import { onMount } from 'svelte'
	import { Button, Headline, Subhead, FormField, TextField, Switch, Divider } from 'attractions'
	import { Navbar } from '@packages/my_common_package/dist/index.js'
	import MyButton from '../components/button.svelte'
</script>

<Navbar />
<Headline>Example app using SvelteKit and Bazel</Headline>
<Subhead>Check out the README.md for more info on how its set up</Subhead>

<Divider text="Login Form Example" />

<form>
	<FormField name="Email" help="Enter your email or username." required>
		<TextField />
	</FormField>

	<FormField name="Password" required>
		<TextField type="password" />
	</FormField>

	<FormField name="Remember me">
		<Switch />
	</FormField>

	<Button>Log in</Button>
</form>

<Divider text="Local Component Example" />

<MyButton />

<style lang="sass">
	:global
		.headline, .subhead, .form-field, hr
			font-family: "Ubuntu", sans-serif
</style>
