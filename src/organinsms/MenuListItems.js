import React from 'react'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListAltIcon from '@material-ui/icons/ListAlt'
import DashboardIcon from '@material-ui/icons/Dashboard'
import MenuItem from '../molecules/MenuItem'

const mainListItems = (
  <div>
    <MenuItem text="Dashboard" to="/dashboard">
      <DashboardIcon />{' '}
    </MenuItem>
  </div>
)

const adminListItems = (
  <div>
    <ListSubheader inset>Administração</ListSubheader>
    <MenuItem text="Politicas de Avaliação" to="/assessment-policies">
      <ListAltIcon />
    </MenuItem>
  </div>
)

export { mainListItems, adminListItems }
