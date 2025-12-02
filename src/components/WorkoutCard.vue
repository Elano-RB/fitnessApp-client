<template>
	<div class="card mb-3">
		<div class="card-body d-flex justify-content-between align-items-start">
			<div>
				<h5 class="card-title">{{ workout.name }}</h5>
				<p class="card-text mb-1">Duration: {{ workout.duration }} mins</p>
				<p class="card-text mb-1">Date: {{ formattedDate }}</p>
				<p class="card-text"><strong>Status:</strong> <span :class="badgeClass">{{ workout.status }}</span></p>
			</div>


			<div class="btn-group-vertical">
				<button class="btn btn-sm btn-outline-success" @click="$emit('toggle-complete', workout)">Toggle Complete</button>
				<button class="btn btn-sm btn-outline-primary" @click="$emit('edit', workout)">Edit</button>
				<button class="btn btn-sm btn-outline-danger" @click="$emit('delete', workout)">Delete</button>
			</div>
		</div>
	</div>
</template>


<script>
	export default {
		props: ['workout'],
		computed: {
			formattedDate() {
				return new Date(this.workout.dateAdded).toLocaleDateString()
			},
			badgeClass() {
				return this.workout.status === 'completed' ? 'badge bg-success' : 'badge bg-warning text-dark'
			}
		}
	}
</script>