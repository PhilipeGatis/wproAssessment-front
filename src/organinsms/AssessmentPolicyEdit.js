import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

import { useSetRecoilState } from 'recoil'
import { commonNotification } from '../api/notification/state'

import CompetenceList from './CompetenceList'

const useStyles = makeStyles((theme) => ({
  paperForm: {
    padding: theme.spacing(4),
  },
  form: {
    padding: theme.spacing(0, 0, 4, 0),
  },
  title: {
    display: 'flex',
    margin: theme.spacing(4, 0, 2),
  },
  saveArea: {
    width: '100%',
    textAlign: 'center',
  },
  pushFlex: {
    flexGrow: 1,
  },
}))

const PolicyAssessmentEdit = ({
  assessmentPolicy,
  update,
  refetch,
  removeCompetence,
  addCompetence,
}) => {
  const classes = useStyles()
  const setNotification = useSetRecoilState(commonNotification)
  const [name, setName] = useState(assessmentPolicy.name)
  const [description, setDescription] = useState(assessmentPolicy.description)
  const [active, setActive] = useState(assessmentPolicy.active)

  const save = async () => {
    try {
      await update(assessmentPolicy.id, {
        ...assessmentPolicy,
        name,
        description,
        active,
      })
      setNotification({
        message: 'Politica de avaliaçãos atualizada com sucesso!',
        isVisible: true,
        type: 'success',
      })
      refetch()
    } catch (e) {
      setNotification({
        message: e.message,
        isVisible: true,
        type: 'error',
      })
    }
  }

  return (
    <>
      <Paper variant="outlined" className={classes.paperForm} square>
        <Box className={classes.form}>
          <TextField
            margin="dense"
            id="name"
            name="name"
            label="Nome"
            type="name"
            fullWidth
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            margin="dense"
            id="description"
            name="description"
            label="Descrição"
            type="description"
            onChange={(event) => setDescription(event.target.value)}
            multiline
            rows={4}
            value={description}
            fullWidth
          />
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  name="active"
                  checked={active}
                  onChange={(event) => setActive(event.target.checked)}
                />
              }
              label="Ativo"
            />
          </FormGroup>
          <Box className={classes.saveArea}>
            <Button color="primary" onClick={save} variant="outlined">
              Salvar
            </Button>
          </Box>
        </Box>
      </Paper>
      <CompetenceList
        assessmentId={assessmentPolicy?.id}
        refetch={refetch}
        competences={assessmentPolicy?.competences || {}}
        addCompetence={addCompetence}
        removeCompetence={removeCompetence}
      />
    </>
  )
}

PolicyAssessmentEdit.propTypes = {
  assessmentPolicy: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  addCompetence: PropTypes.func.isRequired,
  removeCompetence: PropTypes.func.isRequired,
}

export default PolicyAssessmentEdit
