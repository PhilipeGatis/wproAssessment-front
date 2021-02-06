import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import PropTypes from 'prop-types'

const MenuItem = ({ children, text, to }) => {
  const CustomLink = useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <Link ref={ref} to={to} {...linkProps} />
      )),
    [to],
  )

  return (
    <ListItem button component={CustomLink}>
      <ListItemIcon>{children}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  )
}

MenuItem.propTypes = {
  children: PropTypes.element,
  text: PropTypes.string,
  to: PropTypes.string,
}

export default MenuItem
