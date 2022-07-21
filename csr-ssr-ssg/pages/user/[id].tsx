import { NextPage } from 'next'
import { useRouter } from 'next/router'
import type { User } from '../../types/types'

type Props = {
  user: User
}

const UserPage: NextPage<Props> = ({ user }: Props) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>loading....</div>
  }

  return (
    <div>
      <div>{user?.id}</div>
      <div>{user?.username}</div>
      <div>{user?.email}</div>
    </div>
  )
}

export async function getStaticPaths() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users?_limit=2')
  const users = await res.json()

  const paths = users.map((user: User) => {
    return { params: { id: user.id.toString() } }
  })

  return {
    paths,
    fallback: true,
    // fallback = false -> any paths not returned by getStaticPaths() = 404 page
    /** fallback = true 
        -> it will try to generate a page 
        (paths that have not bbeen generated at build time will not result 404 page)
        it will serve fallback version of the page on the first request
        crawler will take fallback=blocking instead (wait until page finished)
    **/
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
