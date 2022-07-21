import { NextPage } from 'next'
import type { User } from '../../types/types'

type Props = {
  user: User
}

const UserPage: NextPage<Props> = ({ user }: Props) => (
  <div>
    <div>{user.id}</div>
    <div>{user.username}</div>
    <div>{user.email}</div>
  </div>
)

export async function getStaticPaths() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await res.json()

  const paths = users.map((user: User) => {
    return { params: { id: user.id.toString() } }
  })

  return {
    paths,
    fallback: false,
  }
}

type Params = {
  params: {
    id: string
  }
}

export async function getStaticProps({ params }: Params) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.id}`
  )
  const user = await res.json()

  return {
    props: { user },
  }
}

export default UserPage
