import { Navigate } from 'react-router-dom'

export const PrivateRoute: React.FC = () => {
  return <Navigate to='/login' replace />
}
