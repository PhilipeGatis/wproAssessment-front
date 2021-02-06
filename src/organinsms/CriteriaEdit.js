import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

import { useSetRecoilState } from 'recoil'
import { commonNotification } from '../api/notification/state'

import CriteriaRuleIntervalNumber from '../molecules/CriteriaRuleIntervalNumber'
import CriteriaRuleOptionList from '../molecules/CriteriaRuleOptionList'

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
  subTypeArea: {
    padding: theme.spacing(0, 2, 0, 2),
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
  { value: 'NUMBER', label: 'Numero' }, // max e min?
  { value: 'TEXT', label: 'Texto' }, // texto aberto
  { value: 'INTERVAL_NUMBER', label: 'Intervalo de Numero' }, // max e min 1-3,
  { value: 'OPTION_LIST_SINGLE', label: 'Lista de opçoes (Unica)' }, // string;string;string,
  { value: 'OPTION_LIST_MULTI', label: 'Lista de opçoes (Multipla)' }, // string';string;string,
  { value: 'PERCENTAGE', label: 'Percentual' }, // 0 - 100
]

const CriteriaEdit = ({
  updateCriteria,
  criteria,
  assessmentId,
  competenceId,
  refetch,
}) => {
  const classes = useStyles()

  const setNotification = useSetRecoilState(commonNotification)

  const [name, setName] = useState(criteria.name)
  const [active, setActive] = useState(criteria.active)
  const [valueType, setValueType] = useState(criteria.valueType)
  const [question, setQuestion] = useState(criteria.question)
  const [justification, setJustification] = useState(criteria.justification)
  const [justificationRequired, setJustificationRequired] = useState(
    criteria.justificationRequired,
  )
  const [rule, setRule] = useState(criteria.rule)

  const save = async () => {
    try {
      await updateCriteria(assessmentId, competenceId, criteria.id, {
        name,
        active,
        valueType,
        question,
        justification,
        justificationRequired,
        rule,
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
            variant="outlined"
            id="question"
            label="Pergunta"
            type="question"
            onChange={(event) => setQuestion(event.target.value)}
            multiline
            value={question}
            rows={4}
            fullWidth
          />
          <Box className={classes.typeArea}>
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
          </Box>
          <Box className={classes.typeArea}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={justification}
                  onChange={(event) => setJustification(event.target.checked)}
                  name="justification"
                  color="primary"
                />
              }
              label="Incluir campo de justificativa?"
            />
            {justification && (
              <Box className={classes.subTypeArea}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={justificationRequired}
                      onChange={(event) =>
                        setJustificationRequired(event.target.checked)
                      }
                      name="justification"
                      color="primary"
                    />
                  }
                  label="Obrigatorio"
                />
              </Box>
            )}
          </Box>
          <TextField
            variant="outlined"
            select
            label="Tipo de Calculo"
            value={valueType}
            onChange={(event) => setValueType(event.target.value)}
            fullWidth
          >
            {calculationTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <Box className={classes.typeArea}>
            {valueType === 'INTERVAL_NUMBER' && (
              <CriteriaRuleIntervalNumber value={rule} onChange={setRule} />
            )}
            {(valueType === 'OPTION_LIST_SINGLE' ||
              valueType === 'OPTION_LIST_MULTI') && (
              <CriteriaRuleOptionList value={rule} onChange={setRule} />
            )}
          </Box>
          <Box className={classes.saveArea}>
            <Button color="primary" onClick={save} variant="outlined">
              Salvar
            </Button>
          </Box>
        </Box>
      </Paper>
    </>
  )
}

CriteriaEdit.propTypes = {
  updateCriteria: PropTypes.func.isRequired,
  criteria: PropTypes.object.isRequired,
  assessmentId: PropTypes.string.isRequired,
  competenceId: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
}

export default CriteriaEdit
