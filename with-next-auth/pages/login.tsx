import { NextPage } from "next";
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'

const LoginPage: NextPage = () => {
  const { data: session }  = useSession()

  if (session) {
    const { user } = session
    return (
      <div>
        you!re logged in
        <div>{user?.name}</div>
        {user?.image && (
          <Image
            src={user.image}
            alt="profile picture"
            width="460px" 
            height="460px"
            layout="responsive"
          />
        )}
        <div>{user?.email}</div>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    )
  }

  return (
    <div>
      login
      <button onClick={() => signIn()}>Sign In</button>
    </div>
  )
}

export default LoginPage
