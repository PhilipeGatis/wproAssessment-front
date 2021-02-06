// Imports
import axios from 'axios'

// register
export const register = (username) =>
  axios.post('http://localhost:4000/user/register', { username })
