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
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

import { useSetRecoilState } from 'recoil'
import { commonNotification } from '../api/notification/state'

import CriteriaList from './CriteriaList'

const useStyles = makeStyles((theme) => ({
  paperForm: {
    padding: theme.spacing(4),
  },
  form: {
    padding: theme.spacing(0, 0, 4, 0),
  },
  typeArea: {
    padding: theme.spacing(2, 0, 2, 0),
  },
  title: {
    display: 'flex',
    margin: theme.spacing(4, 0, 2),
  },
  saveArea: {
    padding: theme.spacing(4, 0, 0),
    width: '100%',
    textAlign: 'center',
  },
  pushFlex: {
    flexGrow: 1,
  },
}))

const calculationTypes = [
  { value: 'TEXT', label: 'Texto Aberto' },
  { value: 'AVERAGE', label: 'Média' },
  { value: 'SUM', label: 'Soma Total' },
  { value: 'PERCENTAGE', label: 'Percentual' },
]

const CompetenceEdit = ({
  updateCompetence,
  competence,
  assessmentId,
  refetch,
  addCriteria,
  removeCriteria,
}) => {
  const classes = useStyles()

  const setNotification = useSetRecoilState(commonNotification)

  const [name, setName] = useState(competence.name)
  const [active, setActive] = useState(competence.active)
  const [description, setDescription] = useState(competence.description)
  const [primaryType, setPrimaryType] = useState(
    competence.primaryType.toString(),
  )
  const [calculation, setCalculation] = useState(competence?.calculation)

  const save = async () => {
    try {
      await updateCompetence(assessmentId, competence.id, {
        name,
        description,
        active,
        primaryType,
        calculation,
      })
      setNotification({
        message: 'Salvo com sucesso!',
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
            label="Nome"
            type="name"
            fullWidth
            value={name}
            variant="outlined"
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            margin="dense"
            id="description"
            label="Descrição"
            type="description"
            onChange={(event) => setDescription(event.target.value)}
            multiline
            rows={4}
            value={description}
            variant="outlined"
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
          <Box className={classes.typeArea}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Tipo:</FormLabel>
              <RadioGroup
                aria-label="primaryType"
                name="primaryType"
                value={primaryType}
                onChange={(event) => setPrimaryType(event.target.value)}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Competencia Primaria"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="Competencia Secundaria"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <TextField
            variant="outlined"
            select
            label="Tipo de Calculo"
            value={calculation}
            onChange={(event) => setCalculation(event.target.value)}
            fullWidth
          >
            {calculationTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <Box className={classes.saveArea}>
            <Button color="primary" onClick={save} variant="outlined">
              Salvar
            </Button>
          </Box>
        </Box>
      </Paper>
      <CriteriaList
        assessmentId={assessmentId}
        refetch={refetch}
        criterias={competence?.critereas || {}}
        competenceId={competence.id}
        addCriteria={addCriteria}
        removeCriteria={removeCriteria}
      />
    </>
  )
}

CompetenceEdit.propTypes = {
  updateCompetence: PropTypes.func.isRequired,
  competence: PropTypes.object.isRequired,
  assessmentId: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
  addCriteria: PropTypes.func.isRequired,
  removeCriteria: PropTypes.func.isRequired,
}

export default CompetenceEdit
