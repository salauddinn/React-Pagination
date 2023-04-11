import { useCallback, useEffect, useState } from 'react'
import './AdminPanel.css'
import PaginationContainer from './PaginationContainer'
import Spinner from './components/Spinner'
import TableContainer from './TableContainer'
import SeachComponent from './components/SearchComponent'
export interface User {
  id: number
  email: string
  role: string
  name: string
}
export enum UserProperties {
  EMAIL = 'email',
  ROLE = 'role',
  NAME = 'name',
}
function AdminPanel() {
  const [users, setUsers] = useState<User[]>([])
  const [allUsers, setAllusers] = useState<User[]>([])
  const [searchUsers, setSearchUsers] = useState<User[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchMode, setSearchMode] = useState(false)

  const [isDeletePressed, setIsDeletePressed] = useState(false)

  useEffect(() => {
    fetchAndSetUsersData()
  }, [])
  const fetchAndSetUsersData = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json',
      )
      const usersData: User[] = await response.json()
      setUsers(usersData.slice(0, 10))
      setAllusers(usersData)
      setLoading(false)
    } catch (err) {
      setErrorMessage('Failed to fetch the data from the server')
      setUsers([])
      setAllusers([])
      setLoading(false)
    }
  }
  const handleDelete = useCallback((currentUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== currentUser.id),
    )

    setAllusers((prevAllUsers) =>
      prevAllUsers.filter((user) => user.id !== currentUser.id),
    )
    if (searchUsers.length > 0) {
      setSearchUsers((prevSearchUsers) =>
        prevSearchUsers.filter((user) => user.id !== currentUser.id),
      )
    }
    setIsDeletePressed(false)
  }, [])
  const handleEdit = useCallback(
    (currentUser: User, propertyName: UserProperties, value: string) => {
      currentUser[propertyName] = value

      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.id === currentUser.id) {
            return currentUser
          }
          return user
        }),
      )
      setAllusers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.id === currentUser.id) {
            return currentUser
          }
          return user
        }),
      )
      if (searchMode) {
        setSearchUsers((prevUsers) =>
          prevUsers.map((user) => {
            if (user.id === currentUser.id) {
              return currentUser
            }
            return user
          }),
        )
      }
    },
    [],
  )

  if (loading) {
    return <Spinner></Spinner>
  }
  if (errorMessage) {
    return <div className="error-message">{errorMessage}</div>
  }
  return (
    <div className="admin-container">
      <SeachComponent
        allUsers={allUsers}
        setUsers={setUsers}
        setSearchUsers={setSearchUsers}
        setSearchMode={setSearchMode}
      />

      <TableContainer
        users={users}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        isDeletePressed={isDeletePressed}
      />
      <PaginationContainer
        totalSize={searchMode ? searchUsers.length : allUsers.length}
        setIsDeletePressed={setIsDeletePressed}
        allUsers={searchMode ? searchUsers : allUsers}
        setUsers={setUsers}
        totalPages={
          searchMode
            ? Math.ceil(searchUsers.length / 10)
            : Math.ceil(allUsers.length / 10)
        }
      />
    </div>
  )
}

export default AdminPanel
