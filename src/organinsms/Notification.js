import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import { useRecoilState } from 'recoil'

import { commonNotification } from '../api/notification/state'

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />

const Notification = () => {
  const [notification, setNotification] = useRecoilState(commonNotification)

  const onHide = () => {
    setNotification((previous) => ({
      ...previous,
      isVisible: false,
    }))
  }

  return (
    <Snackbar
      open={notification.isVisible}
      autoHideDuration={6000}
      onClose={onHide}
    >
      <Alert onClose={onHide} severity={notification.type}>
        {notification.message}
      </Alert>
    </Snackbar>
  )
}

export default Notification
