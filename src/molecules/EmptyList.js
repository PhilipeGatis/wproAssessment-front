import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import DesktopAccessDisabledIcon from '@material-ui/icons/DesktopAccessDisabled'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
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
  text: {
    width: '100%',
    height: theme.spacing(10),
    justifyContent: 'center',
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

const EmptyList = ({ primary, secondary }) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <DesktopAccessDisabledIcon fontSize="large" />
      <Box className={classes.text}>
        <Typography variant="overline" component="div" color="textSecondary">
          {primary}
        </Typography>
        {secondary && (
          <Typography variant="caption" component="div" color="textSecondary">
            {secondary}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

EmptyList.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string,
}

export default EmptyList
