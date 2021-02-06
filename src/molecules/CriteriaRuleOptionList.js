import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const CriteriaRuleOptionList = ({ onChange, value }) => {
  const classes = useStyles()

  const [list, setList] = useState([])
  const [text, setText] = useState([])

  useEffect(() => {
    if (!value) {
      setList([])
      return
    }

    setList(value.split(';'))
  }, [value])

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      const addList = value ? value.split(';') : []
      addList.push(text)
      onChange(addList.join(';'))
      setText('')
    }
  }

  const handleDelete = (item) => {
    const removeList = value ? value.split(';') : []
    onChange(removeList.filter((i) => i !== item).join(';'))
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <TextField
          variant="outlined"
          label="Adicionar item"
          name="item"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={handleEnter}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        {list.map((item) => (
          <Chip key={item} label={item} onDelete={() => handleDelete(item)} />
        ))}
      </Grid>
    </Grid>
  )
}

CriteriaRuleOptionList.propTypes = {
  onChange: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
}

export default CriteriaRuleOptionList
