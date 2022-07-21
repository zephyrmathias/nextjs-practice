import type { User } from '../types/user'
import styles from '../styles/UserDetail.module.css'

type Props = {
  user: User
}

const UserDetail = ({ user }: Props) => (
  <div className={styles.user}>
    <div>id: {user.id}</div>
    <div>name: {user.name}</div>
    <div>email: {user.email}</div>
  </div>
)

export default UserDetail
