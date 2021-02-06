import Box from '@material-ui/core/Box'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import CentredLoader from '../molecules/CentredLoader'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

const Loader = () => {
  const classes = useStyles()
  return (
    <Box component="div" className={classes.root}>
      <CentredLoader size={80} />
    </Box>
  )
}

export default Loader
