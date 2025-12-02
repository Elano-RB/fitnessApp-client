<template>
  <div class="container mt-4">
    <h2 class="mb-3">My Workouts</h2>

    <button
      class="btn btn-success mb-3"
      @click="showAddModal"
    >
      + Add Workout
    </button>

    <div class="row">
      <div v-for="workout in workouts" :key="workout._id" class="col-md-4 mb-3">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title">{{ workout.name }}</h5>
            <p class="card-text">
              Duration: {{ workout.duration }} mins <br />
              Added: {{ formatDate(workout.dateAdded) }} <br />
              Status:
              <span
                class="badge"
                :class="workout.status === 'completed' ? 'bg-success' : 'bg-warning text-dark'"
              >
                {{ workout.status }}
              </span>
            </p>

            <button class="btn btn-primary btn-sm me-2" @click="openEdit(workout)">
              Edit
            </button>
            <button class="btn btn-danger btn-sm me-2" @click="deleteWorkout(workout._id)">
              Delete
            </button>
            <button
              v-if="workout.status !== 'completed'"
              class="btn btn-success btn-sm"
              @click="markComplete(workout._id)"
            >
              Complete
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="addWorkoutModal" tabindex="-1" ref="addModalEl">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="addWorkout">
            <div class="modal-header">
              <h5 class="modal-title">Add Workout</h5>
              <button type="button" class="btn-close" @click="hideAddModal"></button>
            </div>

            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Workout Name</label>
                <input v-model="newWorkout.name" type="text" class="form-control" required />
              </div>

              <div class="mb-3">
                <label class="form-label">Duration (minutes)</label>
                <input v-model="newWorkout.duration" type="number" class="form-control" required />
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="hideAddModal">Cancel</button>
              <button type="submit" class="btn btn-success">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="modal fade" id="editWorkoutModal" tabindex="-1" ref="editModalEl">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="updateWorkout">
            <div class="modal-header">
              <h5 class="modal-title">Edit Workout</h5>
              <button type="button" class="btn-close" @click="hideEditModal"></button>
            </div>

            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Workout Name</label>
                <input v-model="editWorkoutData.name" type="text" class="form-control" required />
              </div>

              <div class="mb-3">
                <label class="form-label">Duration (minutes)</label>
                <input v-model="editWorkoutData.duration" type="number" class="form-control" required />
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="hideEditModal">Cancel</button>
              <button type="submit" class="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import axios from "../services/api";
import { Notyf } from "notyf";
import { Modal } from "bootstrap";
import { useRouter } from "vue-router";

const notyf = new Notyf();

const workouts = ref([]);
const newWorkout = ref({ name: "", duration: "" });
const editWorkoutData = ref({});

const addModalEl = ref(null);
const editModalEl = ref(null);
let addModalInstance = null;
let editModalInstance = null;


const showAddModal = () => {
  addModalInstance.show();
  setTimeout(() => addModalEl.value.querySelector("input").focus(), 100);
};
const hideAddModal = () => addModalInstance.hide();

const showEditModal = () => {
  editModalInstance.show();
  setTimeout(() => editModalEl.value.querySelector("input").focus(), 100);
};
const hideEditModal = () => editModalInstance.hide();


const getWorkouts = async () => {
  try {
    const res = await axios.get("/workouts/getMyWorkouts");
    workouts.value = res.data.workouts;
  } catch (err) {
    console.error(err);
    notyf.error("Failed to load workouts");
  }
};

const addWorkout = async () => {
  try {
    const res = await axios.post("/workouts/addWorkout", {
      name: newWorkout.value.name,
      duration: newWorkout.value.duration,
    });
    workouts.value.push(res.data);
    notyf.success("Workout added!");
    newWorkout.value = { name: "", duration: "" };
    hideAddModal();
  } catch (err) {
    console.error(err);
    notyf.error("Failed to add workout");
  }
};

const openEdit = (workout) => {
  editWorkoutData.value = { ...workout };
  showEditModal();
};

const updateWorkout = async () => {
  try {
    const res = await axios.patch(`/workouts/updateWorkout/${editWorkoutData.value._id}`, {
      name: editWorkoutData.value.name,
      duration: editWorkoutData.value.duration,
    });

    const index = workouts.value.findIndex(w => w._id === editWorkoutData.value._id);
    if (index !== -1) workouts.value[index] = res.data.updatedWorkout;

    notyf.success(res.data.message || "Workout updated!");
    hideEditModal();
  } catch (err) {
    console.error(err);
    notyf.error(err.response?.data?.message || "Update failed");
  }
};

const deleteWorkout = async (id) => {
  if (!confirm("Delete this workout?")) return;
  try {
    const res = await axios.delete(`/workouts/deleteWorkout/${id}`);
    workouts.value = workouts.value.filter(w => w._id !== id);
    notyf.success(res.data.message || "Workout deleted!");
  } catch (err) {
    console.error(err);
    notyf.error(err.response?.data?.message || "Delete failed");
  }
};

const markComplete = async (id) => {
  try {
    const res = await axios.patch(`/workouts/completeWorkoutStatus/${id}`);

    const index = workouts.value.findIndex(w => w._id === res.data.updatedWorkout._id);
    if (index !== -1) workouts.value[index] = res.data.updatedWorkout;

    notyf.success(res.data.message || "Workout status updated!");
  } catch (err) {
    console.error(err);
    notyf.error(err.response?.data?.message || "Action failed");
  }
};

const formatDate = (date) => new Date(date).toLocaleDateString();

onMounted(async () => {

  const token = localStorage.getItem("token");
  if (!token) {
    return router.push("/login");
  }

  await getWorkouts();

  await nextTick();

  if (addModalEl.value) {
    addModalInstance = new Modal(addModalEl.value);
  }

  if (editModalEl.value) {
    editModalInstance = new Modal(editModalEl.value);
  }
});

</script>
