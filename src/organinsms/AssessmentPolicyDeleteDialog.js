import React, { useState } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'

import { useSetRecoilState } from 'recoil'
import { commonNotification } from '../api/notification/state'
import { remove } from '../api/assessmentPolicies/actions/mutation'

const AssessmentPolicyDeleteDialog = ({ id, name, callback }) => {
  const setNotification = useSetRecoilState(commonNotification)

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onConfirm = async () => {
    try {
      await remove(id)
      setNotification({
        message: 'Politica de avaliação removida com sucesso!',
        isVisible: true,
        type: 'success',
      })
    } catch (e) {
      setNotification({
        message: 'Erro ao remove Politica de avaliação!',
        isVisible: true,
        type: 'error',
      })
    }
    callback()
    handleClose()
  }

  return (
    <>
      <IconButton edge="end" aria-label="delete" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">
          Remover Politica de Avaliação
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Realmente deseja remover a politica de avaliação{' '}
            <b>&quot;{name}&quot;</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onConfirm} color="primary">
            Remover
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

AssessmentPolicyDeleteDialog.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
}

export default AssessmentPolicyDeleteDialog
