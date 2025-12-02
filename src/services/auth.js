import api from './api'


export async function registerUser(formData) {
return api.post('/users/register', formData)
}


export async function loginUser(formData) {
return api.post('/users/login', formData)
}


export async function getUserDetails() {
return api.get('/users/details')
}