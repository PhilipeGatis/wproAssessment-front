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

const CompetenceNewDialog = ({ callback, addCompetence, assessmentId }) => {
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
      await addCompetence(assessmentId, { name, description })
      setNotification({
        message: 'Competencia adicionada com sucesso!',
        isVisible: true,
        type: 'success',
      })
    } catch (e) {
      setNotification({
        message: 'Erro ao criar Competencia!',
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
        aria-label="addCompetency"
        onClick={handleClickOpen}
      >
        <AddIcon />
      </IconButton>
      <Dialog
        onClose={handleClose}
        aria-labelledby="Adicionar nova competencia"
        open={open}
      >
        <DialogTitle id="Adicionar nova competencia">
          Nova Competencia
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Preencha o nome e a descrição para cadastrar uma competencia.
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
          <TextField
            margin="dense"
            id="description"
            label="Descrição"
            type="description"
            variant="outlined"
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

CompetenceNewDialog.propTypes = {
  callback: PropTypes.func.isRequired,
  addCompetence: PropTypes.func.isRequired,
  assessmentId: PropTypes.string.isRequired,
}

export default CompetenceNewDialog
