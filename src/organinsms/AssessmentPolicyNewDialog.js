import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import { useSetRecoilState } from 'recoil'
import { commonNotification } from '../api/notification/state'
import { create } from '../api/assessmentPolicies/actions/mutation'

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    zIndex: 1,
    top: theme.spacing(10),
    right: theme.spacing(2),
  },
}))

const AssessmentPolicyNewDialog = ({ callback }) => {
  const classes = useStyles()

  const setNotification = useSetRecoilState(commonNotification)

  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onConfirm = async () => {
    try {
      await create({ name, description })
      setNotification({
        message: 'Politica de avaliação adicionada com sucesso!',
        isVisible: true,
        type: 'success',
      })
    } catch (e) {
      setNotification({
        message: 'Erro ao criar Politica de avaliação!',
        isVisible: true,
        type: 'error',
      })
    }
    callback()
    handleClose()
  }

  return (
    <>
      <Fab
        className={classes.fab}
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">
          Nova Politica de Avaliação
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Preenchar o nome e a descrição para cadastrar uma politica de
            avaliação.
          </DialogContentText>
          <TextField
            autoFocus
            variant="outlined"
            margin="dense"
            id="name"
            label="Nome"
            type="name"
            value={name}
            fullWidth
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            margin="dense"
            variant="outlined"
            id="description"
            label="Descrição"
            type="description"
            onChange={(event) => setDescription(event.target.value)}
            multiline
            value={description}
            rows={4}
            fullWidth
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

AssessmentPolicyNewDialog.propTypes = {
  callback: PropTypes.func.isRequired,
}

export default AssessmentPolicyNewDialog
