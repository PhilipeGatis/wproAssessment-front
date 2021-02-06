import axios from 'axios'

export const getList = () => axios.get('/api/v1/assessmentPolicy')
