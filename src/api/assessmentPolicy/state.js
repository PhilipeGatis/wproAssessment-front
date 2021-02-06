import { atom } from 'recoil'

export const assessmentPolicy = atom({
  key: 'assessmentPolicy',
  default: {
    assessmentPolicy: {},
    isLoading: true,
  },
})
