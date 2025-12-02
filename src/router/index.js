import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import WorkoutsPage from '../pages/WorkoutsPage.vue'


const routes = [
{ path: '/', redirect: '/workouts' },
{ path: '/login', component: LoginPage },
{ path: '/register', component: RegisterPage },
{ path: '/workouts', component: WorkoutsPage }
]


const router = createRouter({
history: createWebHistory(),
routes
})


export default router