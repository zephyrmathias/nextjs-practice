import { NextPage } from 'next'
import Link from 'next/link'

import type { User } from '../types/types'
import UserDetail from '../components/UserDetail'

const api = 'https://jsonplaceholder.typicode.com/users'

type Props = {
  users: User[]
}

const UsersPage: NextPage<Props> = ({ users }) => {
  return (
    <div style={{ margin: '20px', border: '1px solid red' }}>
      {users.map((user) => (
        <Link href={`/user/${user.id}`} key={user.id}>
          <a>
            <UserDetail user={user} />
          </a>
        </Link>
      ))}
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch(api)
  const data = await res.json()

  return {
    props: {
      users: data,
    },
  }
}

export default UsersPage
