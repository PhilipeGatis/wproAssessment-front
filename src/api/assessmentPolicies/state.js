import { atom } from 'recoil'

export const assessmentPolicies = atom({
  key: 'assessmentPolicies',
  default: {
    list: [],
    isLoading: true,
  },
})
