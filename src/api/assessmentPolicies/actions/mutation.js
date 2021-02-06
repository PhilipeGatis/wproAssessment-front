import axios from 'axios'

export const create = (data) => axios.post('/api/v1/assessmentPolicy', data)
export const remove = (id) => axios.delete(`/api/v1/assessmentPolicy/${id}`)
