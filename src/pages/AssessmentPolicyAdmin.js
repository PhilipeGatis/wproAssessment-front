import React, { useCallback, useEffect } from 'react'
import { useParams, Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { useRecoilState, useSetRecoilState } from 'recoil'
import { commonNotification } from '../api/notification/state'
import { assessmentPolicy } from '../api/assessmentPolicy/state'
import { getAssessmentPolicy } from '../api/assessmentPolicy/actions/query'
import {
  update,
  addCompetence,
  removeCompetence,
  updateCompetence,
  addCriteria,
  removeCriteria,
  updateCriteria,
} from '../api/assessmentPolicy/actions/mutation'

import AssessmentPolicyEdit from '../organinsms/AssessmentPolicyEdit'
import CompetenceEdit from '../organinsms/CompetenceEdit'
import CriteriaEdit from '../organinsms/CriteriaEdit'
import Breadcrumb from '../molecules/Breadcrumb'

import CentredLoader from '../molecules/CentredLoader'

const AssessmentPolicyAdmin = ({ history }) => {
  const { assessmentPolicyId, competencyId, criteriaId } = useParams()
  const [
    { assessmentPolicy: assessment, isLoading },
    setAssessmentPolicy,
  ] = useRecoilState(assessmentPolicy)

  const setNotification = useSetRecoilState(commonNotification)

  const fetch = useCallback(async () => {
    try {
      setAssessmentPolicy({
        assessmentPolicy: {},
        isLoading: true,
      })

      const { data } = await getAssessmentPolicy(assessmentPolicyId)
      setAssessmentPolicy({
        assessmentPolicy: data,
        isLoading: false,
      })
    } catch (e) {
      setAssessmentPolicy({
        assessmentPolicy: {},
        isLoading: false,
      })
      setNotification({
        message: e.message,
        isVisible: true,
        type: 'error',
      })
      history.push('/assessment-policies')
    }
  }, [assessmentPolicyId, setAssessmentPolicy, history, setNotification])

  useEffect(() => {
    fetch()
  }, [assessmentPolicyId, fetch])

  const initialBreadCrumb = [
    { name: 'Administração' },
    { name: 'Politicas de avaliação', url: '/assessment-policies' },
  ]

  return (
    <>
      {isLoading && <CentredLoader />}
      {!isLoading && (
        <Switch>
          <Route
            path="/assessment-policies/:assessmentPolicyId/competence/:competenceId/criteria/:criteriaId"
            render={() => {
              const competence = assessment?.competences[competencyId]
              const criteria = competence?.critereas[criteriaId]

              return (
                <>
                  <Breadcrumb
                    list={[
                      ...initialBreadCrumb,
                      {
                        name: assessment?.name,
                        url: `/assessment-policies/${assessment?.id}`,
                      },
                      {
                        name: competence?.name,
                        url: `/assessment-policies/${assessment?.id}/competence/${competence?.id}`,
                      },
                      { name: criteria?.name },
                    ]}
                  />
                  <CriteriaEdit
                    assessmentId={assessment.id}
                    competenceId={competence.id}
                    criteria={criteria}
                    updateCriteria={updateCriteria}
                    refetch={fetch}
                  />
                </>
              )
            }}
          />
          <Route
            path="/assessment-policies/:assessmentPolicyId/competence/:competencyId"
            render={() => {
              const competence = assessment.competences[competencyId]

              return (
                <>
                  <Breadcrumb
                    list={[
                      ...initialBreadCrumb,
                      {
                        name: assessment.name,
                        url: `/assessment-policies/${assessment.id}`,
                      },
                      { name: competence.name },
                    ]}
                  />
                  <CompetenceEdit
                    assessmentId={assessment.id}
                    competence={competence}
                    updateCompetence={updateCompetence}
                    refetch={fetch}
                    addCriteria={addCriteria}
                    removeCriteria={removeCriteria}
                  />
                </>
              )
            }}
          />
          <Route
            path="/assessment-policies/:assessmentPolicyId"
            render={() => (
              <>
                <Breadcrumb
                  list={[...initialBreadCrumb, { name: assessment.name }]}
                />
                <AssessmentPolicyEdit
                  assessmentPolicy={assessment}
                  refetch={fetch}
                  update={update}
                  addCompetence={addCompetence}
                  removeCompetence={removeCompetence}
                />
              </>
            )}
          />
          <Redirect to="/assessment-policies" />
        </Switch>
      )}
    </>
  )
}

AssessmentPolicyAdmin.propTypes = {
  history: PropTypes.object,
}

export default AssessmentPolicyAdmin
