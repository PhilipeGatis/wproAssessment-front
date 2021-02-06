import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link as RouterLink } from 'react-router-dom'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  breadCrumb: {
    paddingBottom: '30px',
  },
}))

const Breadcrumb = ({ list }) => {
  const classes = useStyles()

  return (
    <Breadcrumbs aria-label="breadcrumb" className={classes.breadCrumb}>
      {list.map(({ name, url }, index) => {
        if (!url || index === list.length - 1)
          return (
            <Typography key={name} color="textPrimary">
              {name}
            </Typography>
          )
        return (
          <Link key={name} color="inherit" component={RouterLink} to={url}>
            {name}
          </Link>
        )
      })}
    </Breadcrumbs>
  )
}

Breadcrumb.propTypes = {
  list: PropTypes.array.isRequired,
}

export default Breadcrumb
