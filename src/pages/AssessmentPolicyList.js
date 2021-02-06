import React, { useEffect, useState, useCallback, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck'
import Typography from '@material-ui/core/Typography'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import EditIcon from '@material-ui/icons/Edit'
import SearchIcon from '@material-ui/icons/Search'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import InputAdornment from '@material-ui/core/InputAdornment'
import Box from '@material-ui/core/Box'
import NotInterestedIcon from '@material-ui/icons/NotInterested'

import { useRecoilState } from 'recoil'
import { assessmentPolicies } from '../api/assessmentPolicies/state'
import { getList } from '../api/assessmentPolicies/actions/query'

import IconButtonLink from '../molecules/IconButtonLink'

import AssessmentPolicyNewDialog from '../organinsms/AssessmentPolicyNewDialog'
import AssessmentPolicyDeleteDialog from '../organinsms/AssessmentPolicyDeleteDialog'
import CentredLoader from '../molecules/CentredLoader'

const useStyles = makeStyles((theme) => ({
  breadCrumb: {
    paddingBottom: theme.spacing(8),
  },
  search: {
    padding: theme.spacing(2, 0, 0, 2),
  },
  list: {
    width: '100%',
  },
}))

const AssessmentPolicyList = () => {
  const classes = useStyles()
  const [
    { list: assessmentPoliciesList, isLoading },
    setAssessmentPoliciesLists,
  ] = useRecoilState(assessmentPolicies)

  const [search, setSearch] = useState('')

  const fetch = useCallback(async () => {
    try {
      setAssessmentPoliciesLists({
        list: [],
        isLoading: true,
      })
      const { data } = await getList()
      setAssessmentPoliciesLists({
        list: data,
        isLoading: false,
      })
    } catch (e) {
      setAssessmentPoliciesLists({
        list: [],
        isLoading: false,
      })
    }
  }, [setAssessmentPoliciesLists])

  useEffect(() => {
    fetch()
  }, [fetch])

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadCrumb}>
        <Typography>Admin</Typography>
        <Typography color="textPrimary">Politicas de avaliação</Typography>
      </Breadcrumbs>

      {isLoading && <CentredLoader size={80} />}
      {!isLoading && (
        <>
          <AssessmentPolicyNewDialog callback={fetch} />
          <Paper>
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
              {assessmentPoliciesList
                .filter((item) => {
                  if (!search) return true
                  return search
                    .split(' ')
                    .every(
                      (el) =>
                        item.name?.indexOf(el) > -1 ||
                        item.description?.indexOf(el) > -1,
                    )
                })
                .map((item) => (
                  <Fragment key={item.id}>
                    <ListItem disabled={!item.active}>
                      <ListItemIcon>
                        {item.active ? (
                          <PlaylistAddCheckIcon />
                        ) : (
                          <NotInterestedIcon />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        secondary={item.description}
                      />
                      <ListItemSecondaryAction>
                        <IconButtonLink
                          edge="end"
                          aria-label="edit"
                          to={`/assessment-policies/${item.id}`}
                        >
                          <EditIcon />
                        </IconButtonLink>
                        <AssessmentPolicyDeleteDialog
                          id={item.id}
                          name={item.name}
                          callback={fetch}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </Fragment>
                ))}
            </List>
          </Paper>
        </>
      )}
    </>
  )
}

AssessmentPolicyList.propTypes = {}

export default AssessmentPolicyList
