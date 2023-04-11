import { useEffect, useState } from 'react'
import { User } from '../AdminPanel'

interface SeachComponentProps {
  setUsers(users: User[]): void
  setSearchUsers(users: User[]): void
  allUsers: User[]
  setSearchMode(searchMode: boolean): void
}
const SeachComponent = ({
  setUsers,
  allUsers,
  setSearchUsers,
  setSearchMode,
}: SeachComponentProps) => {
  const [searchValue, setSearchValue] = useState('')

  // we can debounce function to optimize performance
  const updateSearchResult = (searchValue: string) => {
    if (searchValue) {
      const searchResult = getSearchResult(allUsers, searchValue)
      setSearchUsers(searchResult)
      setUsers(searchResult.slice(0, 10))
      setSearchMode(true)
    } else {
      setUsers(allUsers.slice(0, 10))
      setSearchUsers([])
      setSearchMode(false)
    }
  }

  useEffect(() => {
    updateSearchResult(searchValue)
  }, [searchValue])

  const getSearchResult = (allUsers: User[], searchValue: string) => {
    return allUsers.filter((user) => {
      return Object.values(user).some((value) =>
        value
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase().trim()),
      )
    })
  }

  return (
    <div className="search">
      <input
        className="search-input"
        type="text"
        placeholder="search by email or username or role"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value)
        }}
      />
    </div>
  )
}

export default SeachComponent
