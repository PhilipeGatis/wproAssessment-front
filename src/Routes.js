import React from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { useRecoilState, useRecoilValue } from 'recoil'
import { userAuth } from './api/auth/state'
import usePermissioned from './hooks/usePermissioned'

import Login from './pages/Login'
import Loader from './pages/Loader'
import Home from './pages/Home'
import AssessmentPolicyList from './pages/AssessmentPolicyList'
import AssessmentPolicyAdmin from './pages/AssessmentPolicyAdmin'
import Layout from './templates/Layout'
import { commonNotification } from './api/notification/state'

const PermissionRoute = ({
  component: Component,
  permissions = [],
  redirect,
}) => {
  const [notification, setNotification] = useRecoilState(commonNotification)
  const { hasPermission } = usePermissioned()
  if (permissions && !permissions.length)
    return (
      <Layout>
        <Component />
      </Layout>
    )
  const permissioned = hasPermission(permissions)

  if (!permissioned)
    setNotification({
      ...notification,
      message:
        'Você não possui permissão! entre em contato com o administrador do sistema!',
      isVisible: true,
      type: 'error',
    })

  return permissioned ? (
    <Layout>
      <Component />
    </Layout>
  ) : (
    <Redirect to={redirect} />
  )
}

PermissionRoute.propTypes = {
  component: PropTypes.func,
  permissions: PropTypes.array,
  redirect: PropTypes.string,
}

const PrivateRoute = ({ component, permissions, redirect, ...rest }) => {
  const { status } = useRecoilValue(userAuth)

  const routeContent = () =>
    status === 'LOGGED_IN' ? (
      <PermissionRoute
        permissions={permissions}
        redirect={redirect}
        component={component}
      />
    ) : (
      <Redirect to="/login" />
    )

  return status === 'PENDING' ? (
    <Route {...rest} render={() => <Loader />} />
  ) : (
    <Route {...rest} render={routeContent} />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.func,
  permissions: PropTypes.array,
  redirect: PropTypes.string,
}

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <PrivateRoute
        path={[
          '/assessment-policies/:assessmentPolicyId/competence/:competencyId/criteria/:criteriaId',
          '/assessment-policies/:assessmentPolicyId/competence/:competencyId',
          '/assessment-policies/:assessmentPolicyId',
        ]}
        component={AssessmentPolicyAdmin}
        permissions={['ADMIN']}
        redirect="/"
      />
      <PrivateRoute
        path="/assessment-policies"
        component={AssessmentPolicyList}
        permissions={['ADMIN']}
        redirect="/"
      />
      <PrivateRoute exact path="/dashboard" component={Home} />
      <Redirect to="/dashboard" />
    </Switch>
  </Router>
)

export default Routes
