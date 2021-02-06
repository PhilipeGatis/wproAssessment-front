import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import PropTypes from 'prop-types'

import { useSetRecoilState, useRecoilState } from 'recoil'
import { commonNotification } from '../api/notification/state'
import { userAuth } from '../api/auth/state'
import { login, loginSet } from '../api/auth/actions/query'

import logo from '../assets/logo.png'

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <Link href="#">PeopleMind</Link> {new Date().getFullYear()}
    {'.'}
  </Typography>
)

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: '70%',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Login = ({ history }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const setUserAuth = useSetRecoilState(userAuth)
  const [notification, setNotification] = useRecoilState(commonNotification)

  const classes = useStyles()

  const onSubmit = async (event) => {
    event.preventDefault()
    setUserAuth({
      isAuthenticated: false,
      user: null,
      status: 'PENDING',
    })
    try {
      const { data, token } = await login(username, password)

      setUserAuth({
        isAuthenticated: true,
        user: { username: data, roles: ['ADMIN'] },
        status: 'LOGGED_IN',
      })

      loginSet(token, { username: data, roles: ['ADMIN'] })

      history.push('/')
    } catch (e) {
      setError(true)
      setNotification({
        ...notification,
        message: e.message,
        isVisible: true,
        type: 'error',
      })
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <img className={classes.image} src={logo} alt="/#" />
        <form className={classes.form} onSubmit={onSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            error={error}
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            error={error}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Entrar
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

Login.propTypes = {
  history: PropTypes.object,
}

export default Login
