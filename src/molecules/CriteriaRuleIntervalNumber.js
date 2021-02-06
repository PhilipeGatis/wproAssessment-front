import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const CriteriaRuleIntervalNumber = ({ onChange, value }) => {
  const classes = useStyles()

  const [min, setMin] = useState(0)
  const [max, setMax] = useState(0)

  useEffect(() => {
    const calculatedValue = value.split('-')
    setMin(calculatedValue[0] || 0)
    setMax(calculatedValue[1] || 0)
  }, [value])

  const handleChange = (event) => {
    const localValue = event.target.value
    const { name } = event.target
    const calculatedValue = value.split('-')
    if (name === 'min') onChange(`${localValue}-${calculatedValue[1]}`)
    if (name === 'max') onChange(`${calculatedValue[0]}-${localValue}`)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <TextField
          variant="outlined"
          label="Valor Minimo"
          name="min"
          value={min}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          variant="outlined"
          label="Valor Maximo"
          name="max"
          value={max}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
    </Grid>
  )
}

CriteriaRuleIntervalNumber.propTypes = {
  onChange: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
}

export default CriteriaRuleIntervalNumber
