import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

export const getEmployees = (cafe) => {
    const params = cafe ? { cafe } : {}
    return axios.get(`${BASE}/employees`, { params }).then(r => r.data)
}

export const createEmployee = (data) => {
    return axios.post(`${BASE}/employees`, data).then(r => r.data)
}

export const updateEmployee = (id, data) => {
    return axios.put(`${BASE}/employees/${id}`, data).then(r => r.data)
}

export const deleteEmployee = (id) => {
    return axios.delete(`${BASE}/employees/${id}`).then(r => r.data)
}