import axios from 'axios'

export const update = (id, data) =>
  axios.put(`/api/v1/assessmentPolicy/${id}`, data)

export const addCompetence = (assessmentId, data) =>
  axios.post(`/api/v1/assessmentPolicy/${assessmentId}/competencePolicy`, data)

export const updateCompetence = (assessmentId, competenceId, data) =>
  axios.put(
    `/api/v1/assessmentPolicy/${assessmentId}/competencePolicy/${competenceId}`,
    data,
  )

export const removeCompetence = (assessmentId, competenceId) =>
  axios.delete(
    `/api/v1/assessmentPolicy/${assessmentId}/competencePolicy/${competenceId}`,
  )

export const addCriteria = (assessmentId, competenceId, data) =>
  axios.post(
    `/api/v1/assessmentPolicy/${assessmentId}/competencePolicy/${competenceId}/criteriaPolicy`,
    data,
  )

export const updateCriteria = (assessmentId, competenceId, criteriaId, data) =>
  axios.put(
    `/api/v1/assessmentPolicy/${assessmentId}/competencePolicy/${competenceId}/criteriaPolicy/${criteriaId}`,
    data,
  )

export const removeCriteria = (assessmentId, competenceId, criteriaId) =>
  axios.delete(
    `/api/v1/assessmentPolicy/${assessmentId}/competencePolicy/${competenceId}/criteriaPolicy/${criteriaId}`,
  )
