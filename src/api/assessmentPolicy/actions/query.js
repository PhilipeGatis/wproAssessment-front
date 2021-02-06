import axios from 'axios'

export const getAssessmentPolicy = (id) =>
  axios.get(`/api/v1/assessmentPolicy/${id}`)
