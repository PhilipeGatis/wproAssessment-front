import axios from 'axios'

export const login = async (username, password) => {
  const base64String = `Basic ${btoa(`${username}:${password}`)}`
  try {
    const { data } = await axios.get(`/api/v1/user/login/${username}`, {
      headers: {
        Authorization: base64String,
      },
    })
    return Promise.resolve({ data, token: base64String })
  } catch (e) {
    return Promise.reject(e)
  }
}

export const loginSet = (token, user) => {
  axios.defaults.headers.common.Authorization = `${token}`
  window.localStorage.setItem('token', token)
  window.localStorage.setItem('user', JSON.stringify(user))
}

export const logoutUnset = () => {
  delete axios.defaults.headers.common.Authorization
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('user')
}
