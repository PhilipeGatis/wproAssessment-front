import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    justifyContent: 'center',
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

const CentredLoader = ({ size }) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <CircularProgress size={size} />
    </Box>
  )
}

CentredLoader.propTypes = {
  size: PropTypes.number,
}

export default CentredLoader
