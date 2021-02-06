import { useRecoilValue } from 'recoil'
import { userAuth } from '../api/auth/state'

const usePermissioned = () => {
  const { user } = useRecoilValue(userAuth)

  const hasPermission = (permissions) =>
    permissions.some((permission) => user.roles.includes(permission)) ||
    !permissions.length

  return { hasPermission }
}

export default usePermissioned
