import type { NextPage } from 'next'

import useFetchUser from '../hooks/useFetchUser'
import UserDetail from '../components/UserDetail'

const CSRPage: NextPage = () => {
  const users = useFetchUser()

  return (
    <div>
      {users.map((user) => (
        <UserDetail user={user} key={user.id} />
      ))}
    </div>
  )
}

export default CSRPage
