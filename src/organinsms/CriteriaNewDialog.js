import React, { useState } from 'react'
import PropTypes from 'prop-types'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'

import { useSetRecoilState } from 'recoil'
import { commonNotification } from '../api/notification/state'

const CriteriaNewDialog = ({
  callback,
  addCriteria,
  assessmentId,
  competenceId,
}) => {
  const setNotification = useSetRecoilState(commonNotification)

  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onConfirm = async () => {
    try {
      await addCriteria(assessmentId, competenceId, { name })
      setNotification({
        message: 'Criterio adicionado com sucesso!',
        isVisible: true,
        type: 'success',
      })
    } catch (e) {
      setNotification({
        message: 'Erro ao criar Criterio!',
        isVisible: true,
        type: 'error',
      })
    }
    callback()
    handleClose()
  }

  return (
    <>
      <IconButton
        color="primary"
        size="small"
        edge="end"
        aria-label="addCriteria"
        onClick={handleClickOpen}
      >
        <AddIcon />
      </IconButton>
      <Dialog
        onClose={handleClose}
        aria-labelledby="Adicionar novo criterio"
        open={open}
      >
        <DialogTitle id="Adicionar novo criterio">Novo Criterio</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Preencha o nome para cadastrar um criterio.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome"
            variant="outlined"
            type="name"
            value={name}
            fullWidth
            onChange={(event) => setName(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onConfirm} color="primary">
            Cadastrar
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

CriteriaNewDialog.propTypes = {
  callback: PropTypes.func.isRequired,
  addCriteria: PropTypes.func.isRequired,
  assessmentId: PropTypes.string.isRequired,
  competenceId: PropTypes.string.isRequired,
}

export default CriteriaNewDialog
