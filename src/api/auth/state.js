import { atom } from 'recoil'

import { loginSet } from './actions/query'

const userAuthDefault = {
  isAuthenticated: false,
  user: null,
  status: 'LOGGED_OUT',
}

const token = window.localStorage.getItem('token')
if (token && token !== 'undefined' && token !== '') {
  const user = JSON.parse(window.localStorage.getItem('user'))

  if (user) {
    loginSet(token, user)

    userAuthDefault.isAuthenticated = true
    userAuthDefault.user = user
    userAuthDefault.status = 'LOGGED_IN'
  }
}

export const userAuth = atom({
  key: 'userAuth',
  default: userAuthDefault,
})
