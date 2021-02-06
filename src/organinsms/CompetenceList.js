import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'

import CompetenceNewDialog from './CompetenceNewDialog'
import CompetenceDeleteDialog from './CompetenceDeleteDialog'

import IconButtonLink from '../molecules/IconButtonLink'
import EmptyList from '../molecules/EmptyList'

const useStyles = makeStyles((theme) => ({
  paperList: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(0, 4, 4, 4),
  },
  title: {
    display: 'flex',
    margin: theme.spacing(4, 0, 2),
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.default,
    minHeight: '300px',
  },
  pushFlex: {
    flexGrow: 1,
  },
}))

const CompetenceList = ({
  assessmentId,
  competences,
  refetch,
  addCompetence,
  removeCompetence,
}) => {
  const classes = useStyles()

  const [search, setSearch] = useState('')

  const list = Object.values(competences)

  const filtredList = list
    ? list.filter((item) => {
        if (!search) return true
        return search
          .split(' ')
          .every(
            (el) =>
              item.name.indexOf(el) > -1 || item.description.indexOf(el) > -1,
          )
      })
    : []

  return (
    <>
      <Paper variant="outlined" className={classes.paperList} square>
        <Box className={classes.title}>
          <Typography variant="subtitle1">Competencias:</Typography>
          <div className={classes.pushFlex} />
          <CompetenceNewDialog
            callback={refetch}
            addCompetence={addCompetence}
            assessmentId={assessmentId}
          />
        </Box>
        <Box className={classes.search}>
          <TextField
            margin="dense"
            id="search"
            label="Pesquisar"
            type="search"
            value={search}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(event) => setSearch(event.target.value)}
          />
        </Box>
        <List className={classes.list}>
          {!filtredList.length && (
            <EmptyList
              primary="Não existem compoetencias cadastradas!"
              secondary="Adicione uma nova competencia para lista-la!"
            />
          )}
          {!!filtredList.length &&
            filtredList.map((item) => (
              <Fragment key={item.id}>
                <ListItem>
                  <ListItemIcon>
                    <BookmarkIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    secondary={item.description}
                  />
                  <ListItemSecondaryAction>
                    <IconButtonLink
                      edge="end"
                      aria-label="edit"
                      to={`/assessment-policies/${assessmentId}/competence/${item.id}`}
                    >
                      <EditIcon />
                    </IconButtonLink>
                    <CompetenceDeleteDialog
                      competecenId={item.id}
                      assessmentId={assessmentId}
                      name={item.name}
                      removeCompetence={removeCompetence}
                      callback={refetch}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </Fragment>
            ))}
        </List>
      </Paper>
    </>
  )
}

CompetenceList.propTypes = {
  assessmentId: PropTypes.string.isRequired,
  competences: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
  addCompetence: PropTypes.func.isRequired,
  removeCompetence: PropTypes.func.isRequired,
}

export default CompetenceList
