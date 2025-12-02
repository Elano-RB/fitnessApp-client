<template>
	<div class="modal fade" id="addWorkout" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Magdagdag ng Workout</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<form @submit.prevent="onSubmit">
					<div class="modal-body">
						<!-- Tagalog comment: Ipinapaliwanag dito kung anong ilalagay sa "name" field -->
						<div class="mb-3">
							<label class="form-label">Workout Name</label>
							<input v-model="form.name" type="text" class="form-control" placeholder="Hal. Running" required>
						<!-- Tagalog: Ilagay ang pangalan ng workout dito -->
						</div>


						<!-- Tagalog comment: Duration sa minutes -->
						<div class="mb-3">
							<label class="form-label">Duration (minutes)</label>
							<input v-model.number="form.duration" type="number" min="1" class="form-control" required>
						<!-- Tagalog: Ilagay ang tagal ng workout sa minuto -->
						</div>


						<!-- Tagalog comment: Petsa ng workout, default ngayon -->
						<div class="mb-3">
							<label class="form-label">Date</label>
							<input v-model="form.dateAdded" type="date" class="form-control" required>
						<!-- Tagalog: Piliin ang petsa kung kailan ginawa ang workout -->
						</div>


						<!-- Tagalog comment: Status (pending/completed) -->
						<div class="mb-3">
							<label class="form-label">Status</label>
							<select v-model="form.status" class="form-select">
								<option value="pending">Pending</option>
								<option value="completed">Completed</option>
							</select>
						<!-- Tagalog: Piliin kung tapos na ang workout o hindi pa -->
						</div>
					</div>
					<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					<button type="submit" class="btn btn-primary">Save workout</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>


<script>
import api from '../services/api'
import { Notyf } from 'notyf'
const notyf = new Notyf()


export default {
	data() {
		return {
			form: {
				name: '',
				duration: 30,
				dateAdded: new Date().toISOString().substring(0, 10),
				status: 'pending'
			}
		}
	},
	methods: {
		async onSubmit() {
			try {
				await api.post('/workouts/addWorkout', this.form)
				notyf.success('Workout added!')
				// Emit upang i-refresh ang listahan sa parent
				this.$emit('created')
				// Close modal programmatically
				const modalEl = document.getElementById('addWorkout')
				const modal = bootstrap.Modal.getInstance(modalEl)
				modal.hide()
				// I-reset ang form
				this.form = { name: '', duration: 30, dateAdded: new Date().toISOString().substring(0,10), status: 'pending' }
			} catch (err) {
				console.error(err)
				notyf.error(err?.response?.data?.message || 'Error adding workout')
			}
		}
	}
}
</script>