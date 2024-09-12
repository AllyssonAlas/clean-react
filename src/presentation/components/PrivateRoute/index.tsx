import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { AccountContext } from '@/presentation/contexts'

type Props = {
  component: React.ReactElement
}

export const PrivateRoute: React.FC<Props> = ({ component }) => {
  const { getCurrentAccount } = useContext(AccountContext)

  const token = getCurrentAccount()?.accessToken

  return token ? component : <Navigate to='/login' replace />
}
