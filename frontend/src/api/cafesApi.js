import axios from 'axios'

const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

export const getCafes = (location) => {
    const params = location ? { location } : {}
    return axios.get(`${BASE}/cafes`, { params }).then(r => r.data)
}

export const createCafe = (data) => {
    return axios.post(`${BASE}/cafes`, data).then(r => r.data)
} 

export const updateCafe = (id, data) => {
    return axios.put(`${BASE}/cafes/${id}`, data).then(r => r.data)
}

export const deleteCafe = (id) => {
    return axios.delete(`${BASE}/cafes/${id}`).then(r => r.data)
}