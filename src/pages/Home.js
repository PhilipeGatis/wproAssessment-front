import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Home = ({ history }) => <Link to="/login">teste</Link>

Home.propTypes = {
  history: PropTypes.func,
}

export default Home
