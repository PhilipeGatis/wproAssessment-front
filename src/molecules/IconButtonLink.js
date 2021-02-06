import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'

const IconButtonLink = ({ children, to, ...rest }) => {
  const CustomLink = useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <Link ref={ref} to={to} {...linkProps} />
      )),
    [to],
  )

  return (
    <IconButton {...rest} component={CustomLink}>
      {children}
    </IconButton>
  )
}

IconButtonLink.propTypes = {
  children: PropTypes.element,
  to: PropTypes.string,
}

export default IconButtonLink
