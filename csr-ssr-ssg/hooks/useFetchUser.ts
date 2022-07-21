import { useEffect, useState } from 'react'
import type { User } from '../types/user'

function useFetchUser(): User[] {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      const users = await res.json()
      setUsers(users)
    }
    fetchUser()
  }, [])

  return users
}

export default useFetchUser
