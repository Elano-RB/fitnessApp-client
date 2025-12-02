<template>
	<div class="container mt-4">
		<h2>Register</h2>
		<form @submit.prevent="onRegister">
			<div class="mb-3">
				<label class="form-label">Name</label>
				<input v-model="form.name" class="form-control" required />
			</div>
			<div class="mb-3">
				<label class="form-label">Email</label>
				<input v-model="form.email" type="email" class="form-control" required />
			</div>
			<div class="mb-3">
				<label class="form-label">Password</label>
				<input v-model="form.password" type="password" class="form-control" required />
			</div>
			<button class="btn btn-primary">Register</button>
		</form>
	</div>
</template>


<script>
	import { registerUser } from '../services/auth'
	import { Notyf } from 'notyf'
	const notyf = new Notyf()


	export default {
		data() {
			return { form: { name: '', email: '', password: '' } }
		},
		methods: {
			async onRegister() {
				try {
					await registerUser(this.form)
					notyf.success('Registered successfully. Please login.')
					this.$router.push('/login')
				} catch (err) {
					notyf.error(err?.response?.data?.message || 'Error registering')
				}
			}
		}
	}
</script>